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

export const getUrlId = async (req, res) => {
    const { id } = req.params;
    try {
        const url = await db.query(`
        SELECT id, "shortUrl", url
        FROM urls WHERE id = $1`, [id]);
        const objUrl = {
            id,
            shortUrl: url.rows[0].shortUrl,
            url: url.rows[0].url
        }
        res.send(objUrl)
    } catch {
        res.sendStatus(500)
    }
}