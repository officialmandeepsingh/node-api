const { getProductListSchemaValidator } = require("./../../../Schema");
const { productModel } = require("./../../../models");
const CONSTANTS = require("../../../utils/constants/constants");

const getProductList = (req, res, next) => {
  const model = new productModel(req.query);
  model
    .validate(getProductListSchemaValidator)
    .then(() => {
      return model.getProductListSubCategoryWise();
    })
    .then((productList) => {
      return model.getResponse(CONSTANTS.PRODUCT.SELECT, productList);
    })
    .then((response) => {
      res.status(200).json({
        status: 200,
        message: "Product List",
        data: response,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.status = 400;
      return next(error);
    });
};

module.exports = getProductList;
