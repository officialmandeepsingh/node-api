const Joi = require("joi");

const onBoard = Joi.object({
  countryCode: Joi.string().max(5).required().messages({
    "string.base": `{#label} should be a type of String`,
    "string.empty": `{#label} cannot be an empty field`,
    "string.min": `{#label} should have a minimum length of {#limit}`,
    "string.max": `{#label} should have a maximum length of {#limit}`,
    "any.required": `{#label} is a required field`,
    "string.pattern.base": `{#label} is a required field`,
  }),
  phoneNumber: Joi.string()
    .pattern(/^[0-9]+$/)
    .min(5)
    .required()
    .messages({
      "string.base": `{#label} should be a type of String`,
      "string.empty": `{#label} cannot be an empty field`,
      "string.min": `{#label} should have a minimum length of {#limit}`,
      "string.max": `{#label} should have a maximum length of {#limit}`,
      "any.required": `{#label} is a required field`,
      "string.pattern.base": `{#label} is a required field`,
    }),
  deviceToken: Joi.string().default(null).required().messages({
    "string.base": `{#label} should be a type of String`,
    "string.empty": `{#label} cannot be an empty field`,
    "string.min": `{#label} should have a minimum length of {#limit}`,
    "string.max": `{#label} should have a maximum length of {#limit}`,
    "any.required": `{#label} is a required field`,
    "string.pattern.base": `{#label} is a required field`,
  }),
}).options({ allowUnknown: false });

module.exports = onBoard;
