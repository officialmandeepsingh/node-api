const { categoryModel } = require("./../../../models/home");
const { categoryForHomeVaildator } = require("./../../../Schema/customer/home");
const categoryForHome = (req, res, next) => {
	const model = new categoryModel(req.query);

	model
		.validate(categoryForHomeVaildator)
		.then(() => {
			return model.getCategoriesForHome();
		})
		.then((categoryList) => {
			return model.getResponse(categoryList);
		})
		.then((response) => {
			res.json({
				status: 200,
				message: "Category For Home",
				data: response || {},
			});
		})
		.catch((err) => {
			const error = new Error(err);
			error.statusCode = 400;
			return next(error);
		});
};

module.exports = categoryForHome;
