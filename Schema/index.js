const { onBoard, verifyOtpSchema, resendOtp, userProfile } = require('./auth')
const {
	productSchema,
	editProductSchema,
	singleProductSchema
} = require('./product')
const {
	store,
	editStore,
	singleStore,
	category,
	editCategory,
	singleCategory,
	subCategory,
	editSubCategory,
	singleSubCategory
} = require('./admin')

const { favouriteValidator } = require('./customer/favourite')

module.exports = {
	onBoardValidator: onBoard,
	otpVerifyValidator: verifyOtpSchema,
	otpResendValidator: resendOtp,
	// productSchema
	addProductValidator: productSchema,
	editProductValidator: editProductSchema,
	singleProductValidator: singleProductSchema,
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
	favouriteValidator: favouriteValidator
}
