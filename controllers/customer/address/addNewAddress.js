const { customerAddressModel } = require('../../../models/customer/address')
const { addNewAddressValidator } = require('../../../Schema/customer/address')
const CONSTANTS = require('../../../utils/constants/constants')
const addNewAddress = (req, res, next) => {
	const model = new customerAddressModel(req.body)

	model
		.validate(addNewAddressValidator)
		.then(() => {
			return model.addNewAddress()
		})
		.then(() => {
			return model.getResponse(CONSTANTS.BASIC_OPERATION.INSERT)
		})
		.then((response) => {
			res.status(200).json({
				status: 200,
				message: 'Address added successfully',
				data: response || {}
			})
		})
		.catch((err) => {
			const error = new Error(err)
			error.status = 400
			return next(error)
		})
}

module.exports = addNewAddress
