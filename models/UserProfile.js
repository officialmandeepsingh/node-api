const { userProfileValidator } = require("../Schema");
const { createJwtToken, verifyJwtToken } = require("../configuration/jwtToken");
const { database } = require("../configuration");
const { log } = require("../configuration/logger");
const token = require("../configuration/jwtToken");

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
      // let sql = 'INSERT INTO tb_users(firstName, lastName, emailId, deviceToken,phoneNumber, countryCode) VALUES (?,?,?,?,?,?)';
    //   resolve()
      
      this.userData.authToken = token.createJwtToken({
        cusId: this.userData.cusId,
        countryCode: this.userData.countryCode,
        phoneNumber: this.userData.phoneNumber,
        deviceToken: this.userData.deviceToken,
        firstName: this.userData.firstName,
        lastName: this.userData.lastName
      });
      let sql =
        "UPDATE tb_users SET firstName=?,lastName=?,emailId=?,deviceToken=?,authToken=?,phoneNumber=?,countryCode=? WHERE cusId = ?";
      let values = [
        this.userData.firstName,
        this.userData.lastName,
        this.userData.emailId,
        this.userData.deviceToken,
        this.userData.authToken,
        this.userData.phoneNumber,
        this.userData.countryCode,
        this.userData.cusId,
      ];
      const db_query = database.query(sql, values, (error, result) => {
        console.log("Query Execute: " + db_query.sql);
        if (error) {
          reject(error.sqlMessage);
        } else {
          console.log("Query sql: " + db_query.sql);
          resolve();
        }
      });
    });
  };

  getResponse = () => {
    return new Promise((resolve, reject) => {
      resolve({...this.userData});
    });
  };

  saveUpdateAuthTokenInDb = () => {
    return new Promise((resolve, reject) => {
      const token = createJwtToken({
        ...this.userData,
      });
      this.userData.authToken = token;
      let sql = "UPDATE tb_users SET authToken = ? WHERE cusId  = ?";
      let values = [token, custumerId];
      const db_query = database.query(sql, values, (error, result) => {
        console.log("Query Execute: " + db_query.sql);
        if (error) {
          reject(error.sqlMessage);
        } else {
          resolve();
        }
      });
    });
  };
}

module.exports = UserProfile;
