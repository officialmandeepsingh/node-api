const { Router } = require('express')
const {
  addSubCategoryController,
  editSubCategoryController,
  deleteSubCategoryController,
  getAllSubCategoryController,
  getSubCategoryController
} = require('./../../controllers')

const router = Router()

router
  .post('/addSubCategory', addSubCategoryController)
  .post('/editSubCategory', editSubCategoryController)
  .post('/removeSubCategory', deleteSubCategoryController)
  .get('/getAllSubCategory', getAllSubCategoryController)
  .get('/getSubCategory/:subCatId', getSubCategoryController)

module.exports = router
