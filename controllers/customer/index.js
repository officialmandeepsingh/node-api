const dateTimeConvertor = require('./dateTimeConvertor');
const {
  onboard,
  verifyOtp,
  resendOtp,
  logOut,
  userProfile
} = require('./auth');

const { categoryForHome } = require('./store');

module.exports = {
  onboard,
  verifyOtp,
  resendOtp,
  logOut,
  userProfile,
  dateTimeConvertor,
  categoryForHome
};
