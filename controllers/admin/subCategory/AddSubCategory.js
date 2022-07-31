const { SubCategoryModel } = require('./../../../models');
const { subCategoryValidator } = require('./../../../Schema');
addSubCategoryController = (req, res, next) => {
  const subCategoryModel = new SubCategoryModel(req.body);
  subCategoryModel
    .validate(subCategoryValidator)
    .then(() => {
      return subCategoryModel.saveDatainDB();
    })
    .then(() => {
      return subCategoryModel.getResponse();
    })
    .then((response) => {
      res.json({
        status: 200,
        message: 'Add Sub Category',
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

module.exports = addSubCategoryController;
