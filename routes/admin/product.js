const { Router } = require('express');
const {
  addProductController,
  deleteProductController,
  editProductController,
  getProductByCatController,
  singleProductController,
  getAllProductController
} = require('./../../controllers');

const router = Router();

router
  .post('/addproduct', addProductController)
  .get('/viewproductdetail/:productid', singleProductController)
  .post('/updateproductdetail/:productid', editProductController)
  .delete('/deleteproductdetail/:productid', deleteProductController)
  .get('/getproductlist', getAllProductController);

module.exports = router;
