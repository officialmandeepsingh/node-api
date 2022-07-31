const { Router } = require('express');
const {
  addStoreController,
  editStoreController,
  getStoreDetailController,
  getAllStoreDetailController,
  removeStoreController
} = require('./../../controllers');

const router = Router();

router
  .post('/addStore', addStoreController)
  .post('/editStore', editStoreController)
  .post('/removeStore', removeStoreController)
  .get('/getAllStore', getAllStoreDetailController)
  .get('/getStore/:storeId', getStoreDetailController);

module.exports = router;
