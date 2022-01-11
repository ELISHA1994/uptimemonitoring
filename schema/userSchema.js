import Joi from "joi";

export const signup = Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    password: Joi.string().required(),
    phone: Joi.string().required(),
    tosAgreement: Joi.boolean().required(),
})

export const updateUser = Joi.object().keys({
    firstName: Joi.string(),
    lastName: Joi.string(),
    password: Joi.string(),
})

export const login = Joi.object().keys({
    phone: Joi.string().required(),
    password: Joi.string().required()
})