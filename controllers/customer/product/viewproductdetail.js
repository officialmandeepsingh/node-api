const { singleProductValidator } = require("./../../../Schema");
const { productModel } = require("./../../../models");
const CONSTANTS = require("../../../utils/constants/constants");
const productDetail = (req, res, next) => {
  const model = new productModel(req.params);

  model
    .validate(singleProductValidator)
    .then(() => {
      return model.getProductDetails();
    })
    .then((productDetails) => {
      return model.getResponse(CONSTANTS.PRODUCT.VIEW_DETAILS, productDetails);
    })
    .then((response) => {
      res.status(200).json({
        status: 200,
        message: "Product details",
        data: response,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.status = 400;
      return next(error);
    });
};

module.exports = productDetail;
