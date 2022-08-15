const { CategoryModel } = require('./../../../models')
getAllCategoryController = (req, res, next) => {
	const categoryModel = new CategoryModel(req.query)

	categoryModel
		.getAllCategoriesData()
		.then((categoryList) => {
			return categoryModel.getResponse(categoryList)
		})
		.then((response) => {
			res.json({
				status: 200,
				message: 'Execution Successfully',
				data: response
			})
		})
		.catch((err) => {
			console.log('Exception Occur: ' + err)
			const error = new Error(err)
			error.statusCode = 400
			return next(error)
		})
}

module.exports = getAllCategoryController
