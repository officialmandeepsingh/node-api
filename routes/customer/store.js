const { Router } = require('express');
const {
  getStoreDetailController,
  getAllStoreDetailController,
  categoryForHome
} = require('./../../controllers');

const router = Router();

router
  .get('/getAllStore', getAllStoreDetailController)
  .get('/getStore/:storeId', getStoreDetailController)
  .get('/getCategoryForHome', getStoreDetailController);

module.exports = router;
