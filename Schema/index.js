const { onBoard, verifyOtpSchema, resendOtp, userProfile } = require("./auth");
const {
  productSchema,
  editProductSchema,
  singleProductSchema,
  getProductListSchema,
} = require("./product");
const {
  store,
  editStore,
  singleStore,
  category,
  editCategory,
  singleCategory,
  subCategory,
  editSubCategory,
  singleSubCategory,
} = require("./admin");

const { favouriteValidator } = require("./customer/favourite");
const { AddToCartValidator, GetCartValidator } = require("./customer/cart");

module.exports = {
  onBoardValidator: onBoard,
  otpVerifyValidator: verifyOtpSchema,
  otpResendValidator: resendOtp,
  // productSchema
  addProductValidator: productSchema,
  editProductValidator: editProductSchema,
  singleProductValidator: singleProductSchema,
  getProductListSchemaValidator: getProductListSchema,
  userProfileValidator: userProfile,
  // store Validators
  storeValidator: store,
  editStoreValidator: editStore,
  singleStoreValidator: singleStore,
  // category Validators
  categoryValidator: category,
  editCategoryValidator: editCategory,
  singleCategoryValidator: singleCategory,
  // subCategory Validators
  subCategoryValidator: subCategory,
  editSubCategoryValidator: editSubCategory,
  singleSubCategoryValidator: singleSubCategory,

  //Favourite Validators
  favouriteValidator: favouriteValidator,

  //Cart Validators
  AddToCartValidator,
  GetCartValidator,
};
