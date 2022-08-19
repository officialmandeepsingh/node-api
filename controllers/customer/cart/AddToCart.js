const { CartModel } = require("../../../models/customer/cart");
const CONSTANT = require("../../../utils/constants/constants");
const MESSAGE = require("../../../utils/constants/ApiMessages");
const { AddToCartValidator } = require("../../../Schema");
const cart = require("../../../models/customer/cart");

const addToCart = (req, res, next) => {
  const model = new CartModel(req.body);

  model
    .validate(AddToCartValidator)
    .then(() => {
      return model.findUserCart();
    })
    .then((cartId) => {
      return model.updateOrCreateUserCart(cartId);
    })
    .then(() => {
      return model.deleteCartItems();
    })
    .then(() => {
      return model.addCartItems();
    })
    .then(() => {
      return model.updateCusCartWithItemIds();
    })
    .then(() => {
      return model.getResponse();
    })
    .then((result) => {
      res.status(200).json({
        status: 200,
        message: "Add to cart successfully",
        data: result,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.status = 400;
      return next(error);
    });
};

module.exports = addToCart;
