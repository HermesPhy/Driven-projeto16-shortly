import db from "../db.js";

export const getRanking = async (req, res) => {
    try {
        const ranking = await db.query(`
        SELECT users.id, users.name, 
        COUNT(urls.id) AS "linksCount", 
        COALESCE(SUM(urls."visitCount"),0) AS "visitCount"
        FROM users
        LEFT JOIN urls ON urls."userId"=users.id
        GROUP BY users.id
        ORDER BY "visitCount" DESC
        LIMIT 10`);
        ranking.rows.forEach(obj => {
            obj.linksCount = Number(obj.linksCount)
            obj.visitCount = Number(obj.visitCount)
        });
        res.send(ranking.rows)
    } catch {
        res.sendStatus(500)
    }
}