const { dateTimeConvertor } = require('./customer');
const {
  onboard,
  verifyOtp,
  resendOtp,
  logOut,
  userProfile,
  categoryForHome
} = require('./customer');

const {
  addStoreController,
  editStoreController,
  getStoreDetailController,
  getAllStoreDetailController,
  removeStoreController,
  addCategoryController,
  editCategoryController,
  deleteCategoryController,
  getAllCategoryController,
  getCategoryController,
  addSubCategoryController,
  editSubCategoryController,
  deleteSubCategoryController,
  getAllSubCategoryController,
  getSubCategoryController
} = require('./admin');

const {
  addProductController,
  deleteProductController,
  editProductController,
  getProductByCatController,
  singleProductController,
  getAllProductController
} = require('./admin/product');

module.exports = {
  // Authentication Controller
  onboard,
  verifyOtp,
  resendOtp,
  logOut,
  userProfile,
  dateTimeConvertor,

  // Store Controller
  addStoreController,
  editStoreController,
  getStoreDetailController,
  getAllStoreDetailController,
  removeStoreController,
  // Category Controller
  addCategoryController,
  editCategoryController,
  deleteCategoryController,
  getAllCategoryController,
  getCategoryController,
  // Sub Category Controller
  addSubCategoryController,
  editSubCategoryController,
  deleteSubCategoryController,
  getAllSubCategoryController,
  getSubCategoryController,

  //Admin Products Controllers
  addProductController,
  deleteProductController,
  editProductController,
  getProductByCatController,
  singleProductController,
  getAllProductController
};
