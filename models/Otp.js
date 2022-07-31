// const { otpVerifiyValidator } = require('../Schema')
const otpGenerator = require("otp-generator");
const { database } = require("../configuration");
const token = require("../configuration/jwtToken");

class Otp {
  constructor(userData) {
    this.userData = { ...userData };
    this.json = {};
  }

  validate = (validator) => {
    return new Promise((resolve, reject) => {
      const validation = validator.validate(this.userData);
      if (validation.error) {
        reject(validation.error.message);
      } else resolve();
    });
  };

  reGenerateOtpCode = () => {
    return new Promise((resolve, reject) => {
      resolve(
        otpGenerator.generate(4, {
          upperCaseAlphabets: false,
          specialChars: false,
          lowerCaseAlphabets: false,
        })
      );
    });
  };

  verifiyOtp = () => {
    return new Promise((resolve, reject) => {
      let sql = "select * from tb_user_session WHERE sessId = ? and otpCode= ?";
      let values = [this.userData.sessionId, this.userData.otpCode];
      database.query(sql, values, (error, result) => {
        if (error) {
          reject(error.sqlMessage);
        } else {
          if (result.length) {
            this.json = JSON.parse(JSON.stringify(result));
            Object.assign(this.userData, this.json[0]);
            resolve(this.json[0]);
          } else reject("Entered otp is incorrect");
        }
      });
    });
  };

  saveUserInDb = () => {
    return new Promise((resolve, reject) => {
      resolve("User Verified");
    });
  };

  checkUserExistance = () => {
    return new Promise((resolve, reject) => {
      let sql =
        "select * from tb_users WHERE phoneNumber = ? order by phoneNumber DESC";
      let values = [this.json[0].phoneNumber ? this.json[0].phoneNumber : 0];
      const dbQuery = database.query(sql, values, (error, result) => {
        if (error) {
          reject(error.sqlMessage);
        } else {
          console.log("Execute Query: " + dbQuery.sql);
          if (result.length) {
            console.log("->"+result);
            this.json = JSON.parse(JSON.stringify(result));
            Object.assign(this.userData, this.json[0]);
            // this.userData.assign(this.json[0])
            this.userData = { ...this.json[0], ...this.userData}
            resolve();
          } else {
            let sql =
              "INSERT INTO tb_users (phoneNumber, countryCode, deviceToken) VALUES (?,?,?)";
            let values = [
              this.json[0].phoneNumber,
              this.json[0].countryCode,
              this.json[0].deviceToken,
            ];
            database.query(sql, values, (error, result) => {
              if (error) {
                reject(error.sqlMessage);
              } else {
                console.log(result);
                this.userData.cusId= result.insertId
                resolve();
              }
            });
          }
        }
      });
    });
  };

  createUserProfile = () => {
    return new Promise((resolve, reject) => {
      let sql =
        "INSERT INTO tb_users (phoneNumber, countryCode, deviceToken) VALUES (?,?,?)";
      let values = [
        this.json[0].phoneNumber,
        this.json[0].countryCode,
        this.json[0].deviceToken,
      ];
      database.query(sql, values, (error, result) => {
        if (error) {
          reject(error.sqlMessage);
        } else {
          console.log(result);
          resolve(result.insertId);
        }
      });
    });
  };

  generateAuthToken = () => {
    return new Promise((resolve, reject) => {
      this.userData.authToken = token.createJwtToken({
        cusId: this.userData.cusId,
        countryCode: this.userData.countryCode,
        phoneNumber: this.userData.phoneNumber,
        deviceToken: this.userData.deviceToken,
      });

      let sql = "UPDATE tb_users SET authToken= ? WHERE cusId = ?";
      let values = [this.userData.authToken, this.userData.cusId];
      database.query(sql, values, (error, result) => {
        if (error) {
          reject(error.sqlMessage);
        } else {
          if (result.changedRows == 1) resolve();
          else reject("Something went wrong!");
        }
        // resolve()
      });
    });
  };

  saveOtpCode = (otpCode) => {
    return new Promise((resolve, reject) => {
      let sql = "UPDATE tb_user_session SET otpCode= ? WHERE sessId = ?";
      let values = [otpCode, this.userData.sessionId];
      database.query(sql, values, (error, result) => {
        if (error) {
          reject(error.sqlMessage);
        } else {
          if (result.changedRows == 1) resolve();
          else reject("Something went wrong!");
        }
      });
    });
  };

  getVerifyResponse = () => {
    return new Promise((resolve, reject) => {
        delete this.userData['sessionId']
        delete this.userData['otpCode']
        delete this.userData['sessId']

      resolve({ ...this.userData });
    });
  };
}

module.exports = Otp;
