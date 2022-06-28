const dateTimeConvertor = require('./dateTimeConvertor');
const { onboard, verifyOtp, resendOtp, logOut, userProfile } = require('./auth');
const { getProductList, addproduct, deleteproductdetail, updateproductdetail, viewproductdetail } = require('./product')

module.exports = {
    onboard,
    verifyOtp,
    resendOtp,
    logOut,
    userProfile,
    getProductList,
    addproduct,
    deleteproductdetail,
    updateproductdetail,
    viewproductdetail,
    dateTimeConvertor
}