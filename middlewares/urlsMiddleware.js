import db from "../config/db.js";
import { urlSchema, urlIdSchema } from "../schemas/urlsSchema.js";

export const urlMiddleware = async (req, res, next) => {
    const validation = urlSchema.validate(req.body, { abortEarly: false });
    if (validation.error) {
        return res.status(422).send(validation.error.details.map(e => e.message))
    }
    next();
}

export const urlIdMiddleware = async (req, res, next) => {
    const { id } = req.params;
    const validation = urlIdSchema.validate({ id }, { abortEarly: false });
    if (validation.error) {
        return res.status(422).send(validation.error.details.map(e => e.message));
    }
    try {
        const urlId = await db.query('SELECT id FROM urls WHERE id = $1', [id]);
        if (!urlId.rows[0]?.id) {
            return res.status(404).send('Não existe url encurtada para esse id!')
        }
        next();
    } catch {
        res.sendStatus(500)
    }
}

export const shortUrlMiddleware = async (req, res, next) => {
    const { shortUrl } = req.params;
    try {
        const url = await db.query(`
        SELECT url, "shortUrl", "visitCount"
        FROM urls
        WHERE "shortUrl" = $1`, [shortUrl]);
        if (!url.rows[0]?.shortUrl) {
            return res.status(404).send('Não existe esse url encurtado!')
        }
        res.locals.dbUrl = url.rows[0]
        next();
    } catch {
        res.sendStatus(500)
    }
}

export const userUrlMiddleware = async (req, res, next) => {
    const { userId } = res.locals;
    const { id } = req.params;
    try {
        const userUrl = await db.query(`
        SELECT id
        FROM urls
        WHERE "userId" = $1 AND id $2`, [userId, id]);
        if (!userUrl.rows[0]?.id) {
            return res.status(401).send('Url encurtada pertence a outro usuário!')
        }
        next();
    } catch {
        res.sendStatus(500)
    }
}