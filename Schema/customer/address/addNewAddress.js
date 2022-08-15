const Joi = require("joi");
const CONSTANTS = require("../../../utils/constants/constants");

const addNewAddress = Joi.object({
  address: Joi.string().required().min(10).messages({
    "string.base": `{#label} should be a type of String`,
    "string.empty": `{#label} cannot be an empty field`,
    "string.min": `{#label} should have a minimum length of {#limit}`,
    "string.max": `{#label} should have a maximum length of {#limit}`,
    "any.required": `{#label} is a required field`,
    "string.pattern.base": `{#label} is a required field`,
  }),
  addressType: Joi.string()
    .required()
    .valid(
      CONSTANTS.ADDRESS_TYPE.HOME,
      CONSTANTS.ADDRESS_TYPE.WORK,
      CONSTANTS.ADDRESS_TYPE.OTHER
    )
    .messages({
      "string.base": `{#label} should be a type of String`,
      "string.empty": `{#label} cannot be an empty field`,
      "string.min": `{#label} should have a minimum length of {#limit}`,
      "string.max": `{#label} should have a maximum length of {#limit}`,
      "any.required": `{#label} is a required field`,
      "string.pattern.base": `{#label} is a required field`,
    }),
  latitude: Joi.number().required().messages({
    "string.base": `{#label} should be a type of String`,
    "string.empty": `{#label} cannot be an empty field`,
    "string.min": `{#label} should have a minimum length of {#limit}`,
    "string.max": `{#label} should have a maximum length of {#limit}`,
    "any.required": `{#label} is a required field`,
    "string.pattern.base": `{#label} is a required field`,
  }),
  longitude: Joi.number().required().messages({
    "string.base": `{#label} should be a type of String`,
    "string.empty": `{#label} cannot be an empty field`,
    "string.min": `{#label} should have a minimum length of {#limit}`,
    "string.max": `{#label} should have a maximum length of {#limit}`,
    "any.required": `{#label} is a required field`,
    "string.pattern.base": `{#label} is a required field`,
  }),
  landmark: Joi.string().optional().min(3).max(25).messages({
    "string.base": `{#label} should be a type of String`,
    "string.empty": `{#label} cannot be an empty field`,
    "string.min": `{#label} should have a minimum length of {#limit}`,
    "string.max": `{#label} should have a maximum length of {#limit}`,
    "any.required": `{#label} is a required field`,
    "string.pattern.base": `{#label} is a required field`,
  }),
  country: Joi.string().required().min(3).max(25).messages({
    "string.base": `{#label} should be a type of String`,
    "string.empty": `{#label} cannot be an empty field`,
    "string.min": `{#label} should have a minimum length of {#limit}`,
    "string.max": `{#label} should have a maximum length of {#limit}`,
    "any.required": `{#label} is a required field`,
    "string.pattern.base": `{#label} is a required field`,
  }),
  pinCode: Joi.string().required().min(3).max(25).messages({
    "string.base": `{#label} should be a type of String`,
    "string.empty": `{#label} cannot be an empty field`,
    "string.min": `{#label} should have a minimum length of {#limit}`,
    "string.max": `{#label} should have a maximum length of {#limit}`,
    "any.required": `{#label} is a required field`,
    "string.pattern.base": `{#label} is a required field`,
  }),
  addressName: Joi.string().optional().min(3).max(25).messages({
    "string.base": `{#label} should be a type of String`,
    "string.empty": `{#label} cannot be an empty field`,
    "string.min": `{#label} should have a minimum length of {#limit}`,
    "string.max": `{#label} should have a maximum length of {#limit}`,
    "any.required": `{#label} is a required field`,
    "string.pattern.base": `{#label} is a required field`,
  }),
}).options({ allowUnknown: true });

module.exports = addNewAddress;
