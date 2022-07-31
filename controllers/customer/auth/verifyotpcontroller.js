const { Otp } = require('../../../models');
const { otpVerifyValidator } = require('../../../Schema');

const verifyOtp = (req, res, next) => {
  const verifyOtp = new Otp(req.body);

  verifyOtp
    .validate(otpVerifyValidator)
    .then(() => {
      return verifyOtp.verifyOtp();
    })
    .then(() => {
      return verifyOtp.checkUserExistance();
    })
    .then(() => {
      return verifyOtp.generateAuthToken();
    })
    .then(() => {
      return verifyOtp.getVerifyResponse();
    })
    .then((response) => {
      res.json({
        status: 200,
        message: 'Execution Successfully',
        data: response
      });
    })
    .catch((err) => {
      console.log('Exception Occur: ' + err);
      const error = new Error(err);
      error.statusCode = 400;
      return next(error);
    });
};

module.exports = verifyOtp;
