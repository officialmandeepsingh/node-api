// const {userRegisterSchema} = require('./UserRegister')
const { onBoard, verifyOtpSchema, resendOtp, userProfile } = require('./auth')
module.exports = {
    onBoardValidator: onBoard,
    otpVerifiyValidator: verifyOtpSchema,
    otpResendValidator: resendOtp,
    userProfileValidator: userProfile
}
