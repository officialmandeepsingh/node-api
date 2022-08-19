const Joi = require("joi");

const addToCart = Joi.object({
  storeId: Joi.number().integer().required().messages({
    "string.base": `{#label} should be a type of String`,
    "string.empty": `{#label} cannot be an empty field`,
    "string.min": `{#label} should have a minimum length of {#limit}`,
    "string.max": `{#label} should have a maximum length of {#limit}`,
    "any.required": `{#label} is a required field`,
    "string.pattern.base": `{#label} is a required field`,
  }),
  deviceToken: Joi.string().required().messages({
    "string.base": `{#label} should be a type of String`,
    "string.empty": `{#label} cannot be an empty field`,
    "string.min": `{#label} should have a minimum length of {#limit}`,
    "string.max": `{#label} should have a maximum length of {#limit}`,
    "any.required": `{#label} is a required field`,
    "string.pattern.base": `{#label} is a required field`,
  }),
  cartItems: Joi.array()
    .required()
    .items(
      Joi.object({
        prodId: Joi.number().integer().required().messages({
          "string.base": `{#label} should be a type of String`,
          "string.empty": `{#label} cannot be an empty field`,
          "string.min": `{#label} should have a minimum length of {#limit}`,
          "string.max": `{#label} should have a maximum length of {#limit}`,
          "any.required": `{#label} is a required field`,
          "string.pattern.base": `{#label} is a required field`,
        }),
        catId: Joi.number().integer().required().messages({
          "string.base": `{#label} should be a type of String`,
          "string.empty": `{#label} cannot be an empty field`,
          "string.min": `{#label} should have a minimum length of {#limit}`,
          "string.max": `{#label} should have a maximum length of {#limit}`,
          "any.required": `{#label} is a required field`,
          "string.pattern.base": `{#label} is a required field`,
        }),
        subCatId: Joi.number().integer().required().messages({
          "string.base": `{#label} should be a type of String`,
          "string.empty": `{#label} cannot be an empty field`,
          "string.min": `{#label} should have a minimum length of {#limit}`,
          "string.max": `{#label} should have a maximum length of {#limit}`,
          "any.required": `{#label} is a required field`,
          "string.pattern.base": `{#label} is a required field`,
        }),
        quantity: Joi.number().integer().required().messages({
          "string.base": `{#label} should be a type of String`,
          "string.empty": `{#label} cannot be an empty field`,
          "string.min": `{#label} should have a minimum length of {#limit}`,
          "string.max": `{#label} should have a maximum length of {#limit}`,
          "any.required": `{#label} is a required field`,
          "string.pattern.base": `{#label} is a required field`,
        }),
      })
        .required()
        .messages({
          "string.base": `{#label} should be a type of String`,
          "string.empty": `{#label} cannot be an empty field`,
          "string.min": `{#label} should have a minimum length of {#limit}`,
          "string.max": `{#label} should have a maximum length of {#limit}`,
          "any.required": `{#label} is a required field`,
          "string.pattern.base": `{#label} is a required field`,
        })
    ),
}).options({ allowUnknown: false });

module.exports = addToCart;
