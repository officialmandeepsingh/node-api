const { Router } = require("express");
const {
  GetProductListController,
  ViewProductDetailController,
} = require("../../controllers");
const router = Router();

router
  .get("/viewProductDetail/:prodId", ViewProductDetailController)
  .get("/getProductList", GetProductListController);

module.exports = router;
