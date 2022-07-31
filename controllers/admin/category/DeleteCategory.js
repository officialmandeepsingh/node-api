const {CategoryModel} = require('./../../../models')
deleteCategoryController = (req, res, next) => {
    res.json({
        status: 200,
        message: "Delete Category",
        data: {}

    })
}

module.exports = deleteCategoryController