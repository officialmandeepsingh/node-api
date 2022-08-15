const { Favourite } = require('../../../models/customer/favourites')
const CONSTANT = require('../../../utils/constants/constants')
const MESSAGE = require('../../../utils/constants/ApiMessages')
const { favouriteValidator } = require('../../../Schema/customer/favourite')

const viewAllFavourite = (req, res, next) => {
	console.log('=>: ' + JSON.stringify(req.query))
	const model = new Favourite(req.query)

	model
		.validate(favouriteValidator)
		.then(() => {
			return model.getAllProductInFavourites()
		})
		.then((favouritesList) => {
			return model.getResponse(CONSTANT.BASIC_OPERATION.SELECT, favouritesList)
		})
		.then((result) => {
			res.status(200).json({
				status: 200,
				message: MESSAGE.messages.FAVOURITE_PRODUCT,
				data: result || {}
			})
		})
		.catch((err) => {
			const error = new Error(err)
			error.status = 400
			return next(error)
		})
}

module.exports = viewAllFavourite
