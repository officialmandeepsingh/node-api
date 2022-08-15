const { dateTimeConvertor } = require("./customer");
const {
  onboard,
  verifyOtp,
  resendOtp,
  logOut,
  userProfile,
  categoryForHomeContoller,
  categoryDetailsContoller,
} = require("./customer");

const { addToCartController, getFromCartController } = require("./customer");

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
  getSubCategoryController,
} = require("./admin");

const {
  addProductController,
  deleteProductController,
  editProductController,
  getProductByCatController,
  singleProductController,
  getAllProductController,
} = require("./admin/product");

const {
  promoCodeController,
  billPaymentsController,
  paymentMethodsController,
} = require("./customer");

const {
  addNewAddressController,
  getAllAddressController,
  defaultAddressController,
} = require("./customer");

const {
  addFavouriteController,
  removeFavouriteController,
  viewAllFavouriteController,
} = require("./customer");

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
  getAllProductController,
  categoryForHomeContoller,
  categoryDetailsContoller,

  // Cart Modules
  addToCartController,
  getFromCartController,

  //Bill Payment
  promoCodeController,
  billPaymentsController,
  paymentMethodsController,

  //Address
  addNewAddressController,
  getAllAddressController,
  defaultAddressController,

  //Favourites
  addFavouriteController,
  removeFavouriteController,
  viewAllFavouriteController,

  verifyUserTokenController: require("./TokenController"),
  bulkUploadController: require("./bulkUploadController"),
};
