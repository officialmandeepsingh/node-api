const {SubCategoryModel} = require('./../../../models')
deleteSubCategoryController = (req, res, next) => {
    res.json({
        status: 200,
        message: "Delete Sub Category",
        data: {}

    })
}

module.exports = deleteSubCategoryController