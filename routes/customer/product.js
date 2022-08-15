const { Router } = require("express");
const {
	getAllProductController,
	viewproductdetail,
} = require("../../controllers");
const router = Router();

router
	.get("/viewproductdetail/:productid", viewproductdetail)
	.get("/getproductlist", getAllProductController);

module.exports = router;
