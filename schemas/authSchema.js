import Joi from "joi";

export const signupSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.ref('password')
});

export const signinSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});