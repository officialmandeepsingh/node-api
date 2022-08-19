const { CartModel } = require("../../../models/customer/cart");
const CONSTANT = require("../../../utils/constants/constants");
const MESSAGE = require("../../../utils/constants/ApiMessages");
const { GetCartValidator } = require("../../../Schema");

const getFromCart = (req, res, next) => {
  const model = new CartModel(req.query);

  model
    .validate(GetCartValidator)
    .then(() => {
      return model.findUserCart();
    })
    .then(() => {
      return model.getProductFromCart();
    })
    .then((result) => {
      return model.getResponse();
    })
    .then((result) => {
      res.status(200).json({
        status: 200,
        message: "Get Cart successfully",
        data: result,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.status = 400;
      return next(error);
    });
};

module.exports = getFromCart;
