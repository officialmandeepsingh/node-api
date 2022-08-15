const { Favourite } = require('../../../models/customer/favourites')
const CONSTANT = require('../../../utils/constants/constants')
const MESSAGE = require('../../../utils/constants/ApiMessages')
const { favouriteValidator } = require('../../../Schema/customer/favourite')
const addFavourite = (req, res, next) => {
	const model = new Favourite(req.body)

	model
		.validate(favouriteValidator)
		.then(() => {
			return model.addOrRemoveProduct()
		})
		.then(() => {
			return model.getAddOrRemoveResponse()
		})
		.then((result) => {
			switch (parseInt(result['operations'])) {
				case CONSTANT.FAVOURITES.ADD:
					res.status(200).json({
						status: 200,
						message: MESSAGE.messages.PRODUCT_ADDED,
						data: result['data'] || {}
					})
					break
				case CONSTANT.FAVOURITES.REMOVE:
					res.status(200).json({
						status: 200,
						message: MESSAGE.messages.PRODUCT_REMOVED,
						data: result['data'] || {}
					})
					break
			}
		})
		.catch((err) => {
			const error = new Error(err)
			error.status = 400
			return next(error)
		})
}

module.exports = addFavourite
