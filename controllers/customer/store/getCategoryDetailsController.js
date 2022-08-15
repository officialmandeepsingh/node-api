const { CategoryDetailsModel } = require("./../../../models/home");
const { categoryDetailsVaildator } = require("./../../../Schema/customer/home");
const categoryDetails = (req, res, next) => {
	const model = new CategoryDetailsModel(req.query);
	console.log(req.query);
	model
		.validate(categoryDetailsVaildator)
		.then(() => {
			return model.getSubCategories();
		})
		.then((result) => {
			return model.getResponse(result);
		})
		.then((response) => {
			res.status(200).json({
				status: 200,
				message: "Success",
				data: response || {},
			});
		})
		.catch((err) => {
			const error = new Error(err);
			error.status = 400;
			return next(error);
		});
};

module.exports = categoryDetails;
