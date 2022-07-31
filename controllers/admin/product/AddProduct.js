const { addProductValidator } = require('./../../../Schema');
const { productModel } = require('./../../../models');

const addProductController = (req, res, next) => {
  const model = new productModel(req.body);

  model
    .validate(addProductValidator)
    .then(() => {
      return model.addProductInDb();
    })
    .then(() => {
      return model.getResponse();
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

module.exports = addProductController;
