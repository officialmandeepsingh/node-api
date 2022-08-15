const { Router } = require('express');
const {
  getStoreDetailController,
  getAllStoreDetailController,
  categoryForHomeContoller,
  categoryDetailsContoller
} = require('./../../controllers');

const router = Router();

router
  .get('/getAllStore', getAllStoreDetailController)
  .get('/getStore/:storeId', getStoreDetailController)
  .get('/getCategoryForHome', categoryForHomeContoller)
  .get('/getCategoryDetails', categoryDetailsContoller);

module.exports = router;
