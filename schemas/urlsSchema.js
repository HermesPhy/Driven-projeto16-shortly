import Joi from "joi";

export const urlSchema = Joi.object({
    url: Joi.string().required().uri()
});

export const urlIdSchema = Joi.object({
    id: Joi.number().integer().required()
});