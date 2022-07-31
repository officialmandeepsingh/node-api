const { SubCategoryModel } = require('./../../../models');
getAllSubCategoryController = (req, res, next) => {
  const model = new SubCategoryModel(req.body);

  model
    .getAllSubCategoriesData()
    .then((subCategoryList) => {
      return model.getResponse(subCategoryList);
    })
    .then((response) => {
      res.json({
        status: 200,
        message: 'Execution Successfully',
        data: response
      });
    })
    .catch((err) => {
      console.log('Exception Occur: ' + err);
      const error = new Error(err);
      error.statusCode = 400;
      return next(error);
    });
};

module.exports = getAllSubCategoryController;
