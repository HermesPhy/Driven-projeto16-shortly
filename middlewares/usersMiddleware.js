import db from "../config/db.js";
import { urlIdSchema } from "../schemas/urlsSchema.js";

export const usersMiddleware = async (req, res, next) => {
    const { id } = req.params;
    const { userId } = res.locals;
    const validation = urlIdSchema.validate({ id }, { abortEarly: false });
    if (validation.error) {
        return res.status(422).send(validation.error.details.map(e => e.message))
    }
    try {
        const user = await db.query('SELECT id, name FROM users WHERE id = $1', [id]);
        if (!user.rows[0]?.id) {
            return res.status(404).send('Usuário inexistente!')
        }
        if (Number(id) !== userId) {
            return res.status(401).send('id pertencente a outro usuário!')
        }
        res.locals.name = user.rows[0].name
        next();
    } catch {
        res.sendStatus(500)
    }
}