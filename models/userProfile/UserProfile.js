const { userProfileValidator } = require('../../Schema');
const {
  createJwtToken,
  verifyJwtToken
} = require('../../configuration/jwtToken');
const {
  getRecordFromDB,
  insertRecordInDB,
  updateRecordInDB,
  removeRecordFromDB
} = require('../../configuration');
const { log } = require('../../configuration/logger');
const token = require('../../configuration/jwtToken');
const TAG = require('../../utils/constants/Tags');
const MESSAGE = require('../../utils/constants/ApiMessages');

class UserProfile {
  constructor(userData) {
    this.userData = { ...userData };
  }

  validate = () => {
    return new Promise((resolve, reject) => {
      const validation = userProfileValidator.validate(this.userData);
      if (validation.error) {
        reject(validation.error.message);
      } else resolve();
    });
  };

  saveInDb = () => {
    return new Promise((resolve, reject) => {
      this.userData.authToken = token.createJwtToken({
        cusId: this.userData.cusId,
        countryCode: this.userData.countryCode,
        phoneNumber: this.userData.phoneNumber,
        deviceToken: this.userData.deviceToken,
        firstName: this.userData.firstName,
        lastName: this.userData.lastName
      });
      let sql =
        'UPDATE tb_users SET firstName=?,lastName=?,emailId=?,deviceToken=?,authToken=?,phoneNumber=?,countryCode=? WHERE cusId = ?';
      let values = [
        this.userData.firstName,
        this.userData.lastName,
        this.userData.emailId,
        this.userData.deviceToken,
        this.userData.authToken,
        this.userData.phoneNumber,
        this.userData.countryCode,
        this.userData.cusId
      ];
      updateRecordInDB(TAG.OTP.UPDATE_USER_PROFILE, sql, values, true)
        .then((result) => {
          if (result.affectedRows >= 1) resolve();
          else reject(MESSAGE.messages.CUS_ID_INCORRECT);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  getResponse = () => {
    return new Promise((resolve, reject) => {
      resolve({ ...this.userData });
    });
  };

  saveUpdateAuthTokenInDb = () => {
    return new Promise((resolve, reject) => {
      const token = createJwtToken({
        ...this.userData
      });
      this.userData.authToken = token;
      let sql = 'UPDATE tb_users SET authToken = ? WHERE cusId  = ?';
      let values = [token, custumerId];
      updateRecordInDB(TAG.OTP.USER_TOKEN_UPDATE, sql, values)
        .then((result) => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}

module.exports = UserProfile;
