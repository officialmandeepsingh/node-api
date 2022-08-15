const Joi = require("joi");
const joi = require("joi");

const userProfile = Joi.object({
  firstName: Joi.string().required().min(2).alphanum().messages({
    "string.base": `{#label} should be a type of String`,
    "string.empty": `{#label} cannot be an empty field`,
    "string.min": `{#label} should have a minimum length of {#limit}`,
    "string.max": `{#label} should have a maximum length of {#limit}`,
    "any.required": `{#label} is a required field`,
    "string.pattern.base": `{#label} is a required field`,
  }),
  lastName: Joi.string().min(2).required().alphanum().messages({
    "string.base": `{#label} should be a type of String`,
    "string.empty": `{#label} cannot be an empty field`,
    "string.min": `{#label} should have a minimum length of {#limit}`,
    "string.max": `{#label} should have a maximum length of {#limit}`,
    "any.required": `{#label} is a required field`,
    "string.pattern.base": `{#label} is a required field`,
  }),
  emailId: Joi.string().required().min(2).email().messages({
    "string.base": `{#label} should be a type of String`,
    "string.empty": `{#label} cannot be an empty field`,
    "string.min": `{#label} should have a minimum length of {#limit}`,
    "string.max": `{#label} should have a maximum length of {#limit}`,
    "any.required": `{#label} is a required field`,
    "string.pattern.base": `{#label} is a required field`,
  }),
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
  deviceToken: Joi.string().required().messages({
    "string.base": `{#label} should be a type of String`,
    "string.empty": `{#label} cannot be an empty field`,
    "string.min": `{#label} should have a minimum length of {#limit}`,
    "string.max": `{#label} should have a maximum length of {#limit}`,
    "any.required": `{#label} is a required field`,
    "string.pattern.base": `{#label} is a required field`,
  }),
  sessionId: Joi.number().optional().messages({
    "string.base": `{#label} should be a type of Number`,
    "string.empty": `{#label} cannot be an empty field`,
    "string.min": `{#label} should have a minimum length of {#limit}`,
    "string.max": `{#label} should have a maximum length of {#limit}`,
    "any.required": `{#label} is a required field`,
    "string.pattern.base": `{#label} is a required field`,
  }),
  customerDetails: Joi.object().required().messages({
    "string.base": `{#label} should be a type of String`,
    "string.empty": `{#label} cannot be an empty field`,
    "string.min": `{#label} should have a minimum length of {#limit}`,
    "string.max": `{#label} should have a maximum length of {#limit}`,
    "any.required": `{#label} is a required field`,
    "string.pattern.base": `{#label} is a required field`,
  }),
}).options({ allowUnknown: false });

module.exports = userProfile;
