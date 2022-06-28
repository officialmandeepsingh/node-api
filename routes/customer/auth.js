const { Router } = require('express');
const { onboard, verifyOtp, resendOtp, logOut, userProfile} = require('../../controllers')
const router = Router()

router
    .post('/onboard', onboard)
    .post('/verifyotp', verifyOtp)
    .post('/resendotp', resendOtp)
    .post('/logout',logOut)
    .post('/updateprofile',userProfile)
module.exports = router