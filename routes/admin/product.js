const { Router } = require("express");
const {
	addProductController,
	deleteProductController,
	editProductController,
	getProductByCatController,
	singleProductController,
	getAllProductController,
} = require("./../../controllers");

const router = Router();

router
	.post("/addproduct", addProductController)
	.get("/viewproductdetail/:prodId", singleProductController)
	.post("/updateproductdetail", editProductController)
	.delete("/deleteproductdetail/:prodId", deleteProductController)
	.get("/getproductlist", getAllProductController);

module.exports = router;
