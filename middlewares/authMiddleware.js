import bcrypt from "bcrypt";
import db from "../config/db.js";
import { signupSchema, signinSchema } from "../schemas/authSchema.js";

export const signupMiddleware = async (req, res, next) => {
    const { email } = req.body;
    const validation = signupSchema.validate(req.body, { abortEarly: false });
    if (validation.error) {
        return res.status(422).send(validation.error.details.map(e => e.message))
    }
    try {
        const emailConflict = await db.query ('SELECT email FROM users WHERE email = $1', [email]);
        if (emailConflict.rows[0]) {
            return res.status(422).send('Email já existe!')
        }
        next();
    } catch {
        res.sendStatus(500);
    }
}

export const signinMiddleware = async (req, res, next) => {
    const { email, password } = req.body;
    const validation = signinSchema.validate(req.body, { abortEarly: false })
    if (validation.error) {
        return res.status(422).send(validation.error.details.map(e => e.message))
    }
    try {
        const user = await db.query('SELECT id, email, password FROM users WHERE email = $1', [email]);
        if (!user.rows[0]?.email) {
            return res.status(401).send('Usuário não existe!')
        }
        if (!bcrypt.compareSync(password, user.rows[0]?.password)) {
            return res.status(401).send('Senha não compatível!')
        }
        delete user.rows[0].password
        res.locals.user = user.rows[0]
        next();
    } catch {
        res.sendStatus(500);
    }
}