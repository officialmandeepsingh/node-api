const { Router } = require('express')

const {
	addNewAddressController,
	getAllAddressController,
	defaultAddressController,
	verifyUserTokenController
} = require('../../controllers')

const router = Router()

router
	.get('/getAllAddress', verifyUserTokenController, getAllAddressController)
	.post('/addNewAddress', verifyUserTokenController, addNewAddressController)
	.post('/updateAddress', addNewAddressController)
	.put('/removeAddress', addNewAddressController)
	.post(
		'/setDefaultAddress',
		verifyUserTokenController,
		defaultAddressController
	)

module.exports = router
