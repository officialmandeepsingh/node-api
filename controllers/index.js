const { dateTimeConvertor} = require('./customer');
const { onboard, verifyOtp, resendOtp, logOut, userProfile} = require('./customer');
const { getProductList, addproduct, deleteproductdetail, updateproductdetail, viewproductdetail } = require('./customer')

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