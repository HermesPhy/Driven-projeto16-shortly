import db from "../config/db.js";

export const getUsers = async (req, res) => {
    const { id } = req.params;
    const { name } = res.locals;
    try {
        const user = await db.query(`
        SELECT SUM("visitCount") AS "visitCount"
        FROM urls
        WHERE "userId" = $1`, [id]);
        const urls = await db.query(`
        SELECT id, "shortUrl", url, "visitCount"
        FROM urls u
        WHERE u."userId" = $1`, [id]);
        const visitCount = Number(user.rows[0].visitCount);
        const userUrls = {
            id: Number(id),
            name,
            visitCount,
            shortenedUrls: urls.rows
        }
        res.send(userUrls)
    } catch {
        res.sendStatus(500)
    }
}