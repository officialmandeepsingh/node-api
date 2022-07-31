const {
  addStoreController,
  editStoreController,
  getStoreDetailController,
  getAllStoreDetailController,
  removeStoreController
} = require('./store');

const {
  addCategoryController,
  editCategoryController,
  deleteCategoryController,
  getAllCategoryController,
  getCategoryController
} = require('./category');

const {
  addSubCategoryController,
  editSubCategoryController,
  deleteSubCategoryController,
  getAllSubCategoryController,
  getSubCategoryController
} = require('./subCategory');

module.exports = {
  //Store Controller
  addStoreController,
  editStoreController,
  getStoreDetailController,
  getAllStoreDetailController,
  removeStoreController,
  //Category Controller
  addCategoryController,
  editCategoryController,
  deleteCategoryController,
  getAllCategoryController,
  getCategoryController,
  //SubCategory Controller
  addSubCategoryController,
  editSubCategoryController,
  deleteSubCategoryController,
  getAllSubCategoryController,
  getSubCategoryController
};
