const { customerAddressModel } = require('../../../models/customer/address')
const { commonAddressValidator } = require('../../../Schema/customer/address')
const CONSTANTS = require('../../../utils/constants/constants')

const defaultAddress = (req, res, next) => {
	const model = new customerAddressModel(req.body)
	model
		.validate(commonAddressValidator)
		.then(() => {
			return model.setDefaultAddress()
		})
		.then((addressList) => {
			return model.getResponse(CONSTANTS.BASIC_OPERATION.UPDATE)
		})
		.then((response) => {
			res.status(200).json({
				status: 200,
				message: 'Address updated successfully',
				data: response || {}
			})
		})
		.catch((err) => {
			const error = new Error(err)
			error.status = 400
			return next(error)
		})
}

module.exports = defaultAddress
