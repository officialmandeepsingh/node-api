const Joi = require("joi");

const categoryDetails = Joi.object({
  storeId: Joi.number().required().messages({
    "string.base": `{#label} should be a type of String`,
    "string.empty": `{#label} cannot be an empty field`,
    "string.min": `{#label} should have a minimum length of {#limit}`,
    "string.max": `{#label} should have a maximum length of {#limit}`,
    "any.required": `{#label} is a required field`,
    "string.pattern.base": `{#label} is a required field`,
  }),
  catId: Joi.number().required().messages({
    "string.base": `{#label} should be a type of String`,
    "string.empty": `{#label} cannot be an empty field`,
    "string.min": `{#label} should have a minimum length of {#limit}`,
    "string.max": `{#label} should have a maximum length of {#limit}`,
    "any.required": `{#label} is a required field`,
    "string.pattern.base": `{#label} is a required field`,
  }),
}).options({ allowUnknown: false });

module.exports = categoryDetails;
