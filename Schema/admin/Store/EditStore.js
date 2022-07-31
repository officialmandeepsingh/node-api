const Joi = require('@hapi/joi');

const editStore = Joi.object({
    storeName: Joi
        .string()
        .min(5)
        .required()
        .messages({
            'string.base': `{#label} should be a type of String`,
            'string.empty': `{#label} cannot be an empty field`,
            'string.min': `{#label} should have a minimum length of {#limit}`,
            'string.max': `{#label} should have a maximum length of {#limit}`,
            'any.required': `{#label} is a required field`,
            'string.pattern.base': `{#label} is a required field`
        }),
    storeAddress: Joi
        .string()
        .required()
        .messages({
            'string.base': `{#label} should be a type of String`,
            'string.empty': `{#label} cannot be an empty field`,
            'string.min': `{#label} should have a minimum length of {#limit}`,
            'string.max': `{#label} should have a maximum length of {#limit}`,
            'any.required': `{#label} is a required field`,
            'string.pattern.base': `{#label} is a required field`
        }),
    emailId: Joi
        .string()
        .required()
        .min(2)
        .email()
        .messages({
            'string.base': `{#label} should be a type of String`,
            'string.empty': `{#label} cannot be an empty field`,
            'string.min': `{#label} should have a minimum length of {#limit}`,
            'string.max': `{#label} should have a maximum length of {#limit}`,
            'any.required': `{#label} is a required field`,
            'string.pattern.base': `{#label} is a required field`
        }),
    countryCode: Joi
        .string()
        .max(3)
        .required()
        .messages({
            'string.base': `{#label} should be a type of String`,
            'string.empty': `{#label} cannot be an empty field`,
            'string.min': `{#label} should have a minimum length of {#limit}`,
            'string.max': `{#label} should have a maximum length of {#limit}`,
            'any.required': `{#label} is a required field`,
            'string.pattern.base': `{#label} is a required field`
        }),
    phoneNumber: Joi
        .string()
        .required()
        .messages({
            'string.base': `{#label} should be a type of String`,
            'string.empty': `{#label} cannot be an empty field`,
            'string.min': `{#label} should have a minimum length of {#limit}`,
            'string.max': `{#label} should have a maximum length of {#limit}`,
            'any.required': `{#label} is a required field`,
            'string.pattern.base': `{#label} is a required field`
        }),
    latitude: Joi
        .number()
        .required()
        .messages({
            'string.base': `{#label} should be a type of String`,
            'string.empty': `{#label} cannot be an empty field`,
            'string.min': `{#label} should have a minimum length of {#limit}`,
            'string.max': `{#label} should have a maximum length of {#limit}`,
            'any.required': `{#label} is a required field`,
            'string.pattern.base': `{#label} is a required field`
        }),
    longitude: Joi
        .number()
        .required()
        .messages({
            'string.base': `{#label} should be a type of String`,
            'string.empty': `{#label} cannot be an empty field`,
            'string.min': `{#label} should have a minimum length of {#limit}`,
            'string.max': `{#label} should have a maximum length of {#limit}`,
            'any.required': `{#label} is a required field`,
            'string.pattern.base': `{#label} is a required field`
        }),
    storeId: Joi
        .number()
        .required()
        .messages({
            'string.base': `{#label} should be a type of String`,
            'string.empty': `{#label} cannot be an empty field`,
            'string.min': `{#label} should have a minimum length of {#limit}`,
            'string.max': `{#label} should have a maximum length of {#limit}`,
            'any.required': `{#label} is a required field`,
            'string.pattern.base': `{#label} is a required field`
        }),

}).options({ allowUnknown: false })

module.exports = editStore
