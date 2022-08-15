const { Router } = require('express')
const {
	onboard,
	verifyOtp,
	resendOtp,
	logOut,
	userProfile,
	verifyUserTokenController
} = require('../../controllers')
const router = Router()

router
	.post('/onboard', onboard)
	.post('/verifyotp', verifyOtp)
	.post('/resendotp', resendOtp)
	.post('/logout', verifyUserTokenController, logOut)
	.post('/updateprofile', verifyUserTokenController, userProfile)

module.exports = router
