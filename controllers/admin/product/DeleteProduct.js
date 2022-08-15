const { productModel } = require("./../../../models");
const { singleProductValidator } = require("./../../../Schema");
const CONSTANTS = require("./../../../utils/constants/constants");
const deleteProductController = (req, res, next) => {
	const model = new productModel(req.params);
	model
		.validate(singleProductValidator)
		.then(() => {
			return model.deleteProduct();
		})
		.then(() => {
			return model.getResponse(CONSTANTS.PRODUCT.REMOVE);
		})
		.then((response) => {
			res.json({
				success: 200,
				message: "Delete Product successfully",
				data: response || {},
			});
		})
		.catch((err) => {
			const error = new Error(err);
			error.status = 400;
			return next(error);
		});
};

module.exports = deleteProductController;
