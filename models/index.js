const {
  storeModel,
  categoryModel,
  subCategoryModel,
  productModel
} = require('./admin');

const { OnBoard, Otp } = require('./auth');
const { UserProfile } = require('./userProfile');

module.exports = {
  OnBoard: OnBoard,
  Otp: Otp,
  UserProfile: UserProfile,
  StoreModel: storeModel,
  CategoryModel: categoryModel,
  SubCategoryModel: subCategoryModel,
  productModel: productModel
};
