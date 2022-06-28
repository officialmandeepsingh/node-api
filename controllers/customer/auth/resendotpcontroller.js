const { Otp } = require('../../../models')
const { otpResendValidator } = require('../../../Schema')

const resendOtp = (req, res, next) => {
    const resendOtp = new Otp(req.body)

    resendOtp
        .validate(otpResendValidator)
        .then(() => {
            return resendOtp.reGenerateOtpCode()
        })
        .then((otpCode) => {
            console.log(otpCode);
            return resendOtp.saveOtpCode(otpCode)
        })
        .then((response) => {
            res.json({
                status: 200,
                message: "Execution Successfully",
                data: {}
            })
        })
        .catch((err) => {
            console.log('Exception Occr: ' + err);
            const error = new Error(err);
            error.statusCode = 400;
            return next(error);
        })

}

module.exports = resendOtp