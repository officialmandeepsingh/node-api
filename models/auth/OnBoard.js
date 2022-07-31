const { onBoardValidator } = require('../../Schema');
const {
  getRecordFromDB,
  updateRecordInDB,
  insertRecordInDB,
  removeRecordFromDB
} = require('../../configuration');
const TAG = require('../../utils/constants/Tags');
const otpGenerator = require('otp-generator');

class OnBoard {
  constructor(userData) {
    this.userData = { ...userData };
  }

  generateOtpCode = () => {
    return new Promise((resolve, reject) => {
      resolve(
        otpGenerator.generate(4, {
          upperCaseAlphabets: false,
          specialChars: false,
          lowerCaseAlphabets: false
        })
      );
    });
  };

  saveUserInDb = (otpCode) => {
    return new Promise((resolve, reject) => {
      console.log(otpCode);
      let sql =
        'INSERT INTO tb_user_session (phoneNumber, countryCode, deviceToken, otpCode) VALUES (?,?,?,?)';
      let values = [
        this.userData.phoneNumber,
        this.userData.countryCode,
        this.userData.deviceToken,
        otpCode
      ];

      insertRecordInDB(TAG.ON_BOARD.ADD_USER_SESSION, sql, values, true)
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  getUserDataFromDb = (insertId) => {
    return new Promise((resolve, reject) => {
      let sql = 'select * from tb_user_session where sessId = ?';
      let values = [insertId];

      getRecordFromDB(TAG.ON_BOARD.GET_USER_SESSION, sql, values)
        .then((result) => {
          var json = JSON.parse(JSON.stringify(result));
          resolve(json[0]);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  validate = () => {
    return new Promise((resolve, reject) => {
      const validation = onBoardValidator.validate(this.userData);
      if (validation.error) {
        reject(validation.error.message);
      } else resolve(true);
    });
  };

  getResponse = (sessionId) => {
    return new Promise((resolve, reject) => {
      let response = {};
      response['sessionId'] = sessionId;
      resolve(response);
    });
  };
}

module.exports = OnBoard;
