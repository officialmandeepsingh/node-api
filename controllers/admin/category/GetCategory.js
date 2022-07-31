const { CategoryModel } = require('./../../../models');
const { singleCategoryValidator } = require('./../../../Schema');

getCategoryController = (req, res, next) => {
  const model = new CategoryModel(req.params);

  model
    .validate(singleCategoryValidator)
    .then(() => {
      return model.getSingleCategoryDetails();
    })
    .then(() => {
      return model.getResponse(4);
    })
    .then((response) => {
      res.status(200).json({
        status: 200,
        message: 'Execution successfully',
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

module.exports = getCategoryController;
