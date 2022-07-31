const { CategoryModel } = require('./../../../models');
const { categoryValidator } = require('./../../../Schema');
addCategoryController = (req, res, next) => {
  const categoryModel = new CategoryModel(req.body);

  categoryModel
    .validate(categoryValidator)
    .then(() => {
      return categoryModel.saveDatainDB();
    })
    .then(() => {
      return categoryModel.getResponse();
    })
    .then((response) => {
      res.json({
        status: 200,
        message: 'Add Category',
        data: response
      });
    })
    .catch((err) => {
      console.log('Exception Occur: : ' + err);
      const error = new Error(err);
      error.statusCode = 400;
      return next(error);
    });
};

module.exports = addCategoryController;
