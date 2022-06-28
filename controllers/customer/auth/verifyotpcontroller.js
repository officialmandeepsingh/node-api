const { Otp } = require('../../../models')
const { otpVerifiyValidator } = require('../../../Schema')

const verifyOtp = (req, res, next) => {
    const verifyOtp = new Otp(req.body)

    verifyOtp
        .validate(otpVerifiyValidator)
        .then(() => {
            return verifyOtp.verifiyOtp()
        })
        .then(() => {
            return verifyOtp.checkUserExistance()
        })
        /* .then((data) => {
            // if(data)
            //    return verifyOtp. getVerifyResponse()
            //    else
                return verifyOtp.createUserProfile()
        }) */
        .then(() => {
            return verifyOtp.generateAuthToken()
        })
        .then(() => {
            return verifyOtp.getVerifyResponse()
        })
        .then((response) => {
            res.json({
                status: 200,
                message: "Execution Successfully",
                data: response
            })
        })
        .catch((err) => {
            console.log('Exception Occr: ' + err);
            const error = new Error(err);
            error.statusCode = 400;
            return next(error);
        })

}

module.exports = verifyOtp