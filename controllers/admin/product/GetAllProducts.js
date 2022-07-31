const { productModel } = require('./../../../models');

const getAllProductController = (req, res, next) => {
  const model = new productModel();

  model
    .getAllProductList()
    .then((productList) => {
      return model.getResponse(productList);
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

module.exports = getAllProductController;
