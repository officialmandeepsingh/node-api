const { productModel } = require("./../../../models");
const { editProductValidator } = require("./../../../Schema");
const CONSTANTS = require("./../../../utils/constants/constants");

const editProductController = (req, res, next) => {
	const model = new productModel(req.body);
	model
		.validate(editProductValidator)
		.then(() => {
			return model.updateProduct();
		})
		.then(() => {
			return model.getResponse(CONSTANTS.PRODUCT.UPDATE);
		})
		.then((response) => {
			res.json({
				success: 200,
				message: "Updated product successfully",
				data: response || {},
			});
		})
		.catch((err) => {
			const error = new Error(err);
			error.status = 400;
			return next(error);
		});
};

module.exports = editProductController;
