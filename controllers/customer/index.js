const dateTimeConvertor = require('./dateTimeConvertor')
const { onboard, verifyOtp, resendOtp, logOut, userProfile } = require('./auth')

const {
	categoryForHomeContoller,
	categoryDetailsContoller
} = require('./store')

const { addToCartController, getFromCartController } = require('./cart')
const {
	promoCodeController,
	billPaymentsController,
	paymentMethodsController
} = require('./breakdown')

const {
	addNewAddressController,
	getAllAddressController,
	defaultAddressController
} = require('./address')

const {
	addFavouriteController,
	removeFavouriteController,
	viewAllFavouriteController
} = require('./favourites')

module.exports = {
	onboard,
	verifyOtp,
	resendOtp,
	logOut,
	userProfile,
	dateTimeConvertor,
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

	// Favourites
	addFavouriteController,
	removeFavouriteController,
	viewAllFavouriteController
}
