import db from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const postUser = async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    try {
        await db.query(`
        INSERT INTO users (name, email, password)
        VALUE ($1, $2, $3)`, [name, email, hashedPassword])
        res.sendStatus(201);
    } catch {
        res.sendStatus(500);
    }
}

export const postSignin = async (req, res) => {
    const { user } = res.locals
    const secretKey = process.env.JWT_SECRET
    const token = jwt.sign(user, secretKey)
    try {
        await db.query(`
        INSERT INTO sessions ("userId", token)
        VALUES ($1, $2)`, [user.id, token])
        res.send(token)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
}