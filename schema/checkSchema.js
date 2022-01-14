import Joi from "joi";

export const createCheck = Joi.object().keys({
    protocol: Joi.string().required(),
    url: Joi.string().required(),
    method: Joi.string().required(),
    successCodes: Joi.array().required(),
    timeoutSeconds: Joi.number().required()
})

export const updateCheck = Joi.object().keys({
    protocol: Joi.string(),
    url: Joi.string(),
    method: Joi.string(),
    successCodes: Joi.array(),
    timeoutSeconds: Joi.number()
})