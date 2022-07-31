const { SubCategoryModel } = require('./../../../models');
const { editSubCategoryValidator } = require('./../../../Schema');
editSubCategoryController = (req, res, next) => {
  const model = new SubCategoryModel(req.body);

  model
    .validate(editSubCategoryValidator)
    .then(() => {
      return model.updateSubCategoryData();
    })
    .then(() => {
      return model.getResponse();
    })
    .then((response) => {
      res.status(200).json({
        status: 200,
        message: 'Sub Category Updated successfully',
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

module.exports = editSubCategoryController;
