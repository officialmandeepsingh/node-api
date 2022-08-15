const { customerAddressModel } = require('../../../models/customer/address')
const { addNewAddressValidator } = require('../../../Schema/customer/address')
const CONSTANTS = require('../../../utils/constants/constants')

const getAllAddress = (req, res, next) => {
	const model = new customerAddressModel(req.query)
	model
		.getAllAddress()
		.then((addressList) => {
			return model.getResponse(CONSTANTS.BASIC_OPERATION.SELECT, addressList)
		})
		.then((response) => {
			res.status(200).json({
				status: 200,
				message: 'Customer Address List',
				data: response || {}
			})
		})
		.catch((err) => {
			const error = new Error(err)
			error.status = 400
			return next(error)
		})
}

module.exports = getAllAddress
