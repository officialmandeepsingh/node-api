const Joi = require('@hapi/joi');

const favourite = Joi.object({
  productId: Joi.number().required().messages({
    'string.base': `{#label} should be a type of String`,
    'string.empty': `{#label} cannot be an empty field`,
    'any.required': `{#label} is a required field`,
    'string.pattern.base': `{#label} is a required field`
  }),
  storeId: Joi.number().required().messages({
    'string.base': `{#label} should be a type of String`,
    'string.empty': `{#label} cannot be an empty field`,
    'string.min': `{#label} should have a minimum length of {#limit}`,
    'string.max': `{#label} should have a maximum length of {#limit}`,
    'any.required': `{#label} is a required field`,
    'string.pattern.base': `{#label} is a required field`
  }),
  authToken: Joi.string().optional().messages({
    'string.base': `{#label} should be a type of String`,
    'string.empty': `{#label} cannot be an empty field`,
    'string.min': `{#label} should have a minimum length of {#limit}`,
    'string.max': `{#label} should have a maximum length of {#limit}`,
    'any.required': `{#label} is a required field`,
    'string.pattern.base': `{#label} is a required field`
  }),
  deviceToken: Joi.string().default(null).required().messages({
    'string.base': `{#label} should be a type of String`,
    'string.empty': `{#label} cannot be an empty field`,
    'string.min': `{#label} should have a minimum length of {#limit}`,
    'string.max': `{#label} should have a maximum length of {#limit}`,
    'any.required': `{#label} is a required field`,
    'string.pattern.base': `{#label} is a required field`
  })
}).options({ allowUnknown: false });

module.exports = favourite;