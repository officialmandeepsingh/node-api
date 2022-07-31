const { Router } = require('express')
const {
  addCategoryController,
  editCategoryController,
  deleteCategoryController,
  getAllCategoryController,
  getCategoryController
} = require('./../../controllers')

const router = Router()

router
  .post('/addCategory', addCategoryController)
  .post('/editCategory', editCategoryController)
  .post('/removeCategory', deleteCategoryController)
  .get('/getAllCategory', getAllCategoryController)
  .get('/getCategory/:catId', getCategoryController)

module.exports = router
