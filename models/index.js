const {
	storeModel,
	categoryModel,
	subCategoryModel,
	productModel
} = require('./admin')

const { OnBoard, Otp } = require('./auth')
const userProfile = require('./userProfile')

module.exports = {
	OnBoard: OnBoard,
	Otp: Otp,
	UserProfile: userProfile,
	StoreModel: storeModel,
	CategoryModel: categoryModel,
	SubCategoryModel: subCategoryModel,
	productModel: productModel
}
