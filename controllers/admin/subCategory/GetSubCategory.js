const { SubCategoryModel } = require('./../../../models');
const { singleSubCategoryValidator } = require('./../../../Schema');

getSubCategoryController = (req, res, next) => {
  const model = new SubCategoryModel(req.params);

  model
    .validate(singleSubCategoryValidator)
    .then(() => {
      return model.getSingleSubCategoryDetails();
    })
    .then(() => {
      return model.getResponse(3);
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

module.exports = getSubCategoryController;
