const { CategoryModel } = require('./../../../models');
const { editCategoryValidator } = require('./../../../Schema');

editCategoryController = (req, res, next) => {
  const model = new CategoryModel(req.body);

  model
    .validate(editCategoryValidator)
    .then(() => {
      return model.updateCategoryData();
    })
    .then(() => {
      return model.getResponse();
    })
    .then((response) => {
      res.status(200).json({
        status: 200,
        message: 'Category Updated successfully',
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

module.exports = editCategoryController;
