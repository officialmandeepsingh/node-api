const Joi = require("joi");

const userRegisterSchema = Joi.object({
  username: Joi.string()
    .alphanum()
    .required()
    .min(4)
    .max(15)
    .message(
      "Your username must be at least 4 characters and conatins ony Alphanumerics"
    ),
  emailId: Joi.string().email().required(),
  password: Joi.string()
    .pattern(
      new RegExp(
        "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
      )
    )
    .message(
      "Your password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, one number and one special character"
    )
    .required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
});

module.exports = {
  userRegisterSchema,
};
