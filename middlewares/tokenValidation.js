import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import db from "../config/db.js";

dotenv.config();

export const tokenValidation = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        const token = authorization?.replace('Bearer ', '').trim();
        if (!token) {
            return res.status(401).send('Header inválido!')
        }
        const secretKey = process.env.JWT_SECRET;
        try {
            const data = jwt.verify(token, secretKey);
        } catch {
            return res.status(401).send('Token inválido!')
        }
        const userSession = await db.query(`
        SELECT users.id, sessions.token
        FROM sessions
        JOIN users ON sessions."userId" = users.id
        WHERE sessions.token = $1`, [token]);
        if (!userSession.rows[0]?.token) {
            return res.status(401).send('Sessão não encontrada!')
        }
        if (!userSession.rows[0]?.id) {
            return res.status(401).send('Usuário não encontrado!')
        }
        res.locals.userId = userSession.rows[0].id;
        next();
    } catch {
        res.sendStatus(500)
    }
}