import { nanoid } from "nanoid";
import db from "../config/db.js";

export const postUrl = async (req, res) => {
    const { userId } = res.locals;
    const { url } = req.body;
    const shortUrl = nanoid();
    try {
        await db.query(`
        INSERT INTO urls ("userId", url, "shortUrl")
        VALUES ($1, $2, $3)`, [userId, url, shortUrl]);
        res.status(201).send({ shortUrl })
    } catch {
        res.sendStatus(500)
    }
}