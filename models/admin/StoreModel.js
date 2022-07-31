const { storeValidator } = require('./../../Schema');
const {
  getRecordFromDB,
  updateRecordInDB,
  insertRecordInDB,
  removeRecordFromDB
} = require('../../configuration');
const apiMessages = require('../../utils/constants/ApiMessages');
const TAG = require('../../utils/constants/Tags');

class StoreModel {
  constructor(userData) {
    this.userData = { ...userData };
  }

  validate = (validator) => {
    return new Promise((resolve, reject) => {
      const validation = validator.validate(this.userData);
      if (validation.error) {
        reject(validation.error.message);
      } else resolve(true);
    });
  };

  addStoreInDb = () => {
    return new Promise((resolve, reject) => {
      let sql =
        'INSERT INTO tb_store(storeName, storeAddress, emailId, countryCode, phoneNumber, latitude, longitude) VALUES (?,?,?,?,?,?,?)';
      let values = [
        this.userData.storeName,
        this.userData.storeAddress,
        this.userData.emailId,
        this.userData.countryCode,
        this.userData.phoneNumber,
        this.userData.latitude,
        this.userData.longitude
      ];

      insertRecordInDB(TAG.STORE.ADD_STORE, sql, values, true)
        .then((result) => {
          this.userData.storeId = result;
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  updateStoreData = () => {
    return new Promise((resolve, reject) => {
      let sql =
        'UPDATE tb_store SET storeName=?,storeAddress=?,emailId=?,countryCode=?,phoneNumber=?,latitude=?,longitude=? WHERE storeId=?';
      let values = [
        this.userData.storeName,
        this.userData.storeAddress,
        this.userData.emailId,
        this.userData.countryCode,
        this.userData.phoneNumber,
        this.userData.latitude,
        this.userData.longitude,
        this.userData.storeId
      ];

      updateRecordInDB(TAG.STORE.UPDATE_STORE, sql, values)
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  getAllStores = () => {
    return new Promise((resolve, reject) => {
      console.log(this.userData);
      let sql = 'select * from tb_store';
      let values = [];

      if (this.userData.latitude && this.userData.longitude) {
        sql +=
          ' WHERE ST_Distance_Sphere(POINT(latitude,longitude), POINT(?,?))*0.001 < 20';
        values.push(
          Number.parseFloat(this.userData.latitude),
          Number.parseFloat(this.userData.longitude)
        );
      }

      getRecordFromDB(TAG.STORE.GET_ALL_STORES, sql, values)
        .then((result) => {
          const storesList = [];
          if (result.length) {
            this.json = JSON.parse(JSON.stringify(result));
            this.json.forEach((element) => {
              storesList.push(element);
            });
          }
          resolve(storesList);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  getStore = () => {
    return new Promise((resolve, reject) => {
      let sql = 'select * from tb_store WHERE storeId=?';
      let values = [this.userData.storeId];
      getRecordFromDB(TAG.STORE.GET_SINGLE_STORE, sql, values)
        .then((result) => {
          if (result.length) {
            this.json = JSON.parse(JSON.stringify(result));
            Object.assign(this.userData, this.json[0]);
            resolve();
          } else reject(apiMessages.messages.NO_STORE_FOUND);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  removeStore = () => {
    return new Promise((resolve, reject) => {
      let sql = 'delete from tb_store WHERE storeId=?';
      let values = [this.userData.storeId];
      removeRecordFromDB(TAG.STORE.DELETE_STORE, sql, values)
        .then((result) => {
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  getResponse = (storesList) => {
    return new Promise((resolve, reject) => {
      if (storesList) {
        if (storesList && storesList.length > 0) {
          resolve({
            count: storesList.length,
            stores: storesList
          });
        } else {
          reject(apiMessages.messages.NOT_DELIVERED_AREA);
        }
      } else resolve(this.userData);
    });
  };
}

module.exports = StoreModel;
