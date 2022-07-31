const {
  getRecordFromDB,
  updateRecordInDB,
  insertRecordInDB,
  removeRecordFromDB
} = require('../../configuration');
const TAG = require('../../utils/constants/Tags');
const apiMessages = require('../../utils/constants/ApiMessages');

class CategoryModel {
  constructor(userData) {
    this.userData = { ...userData };
  }

  validate = (validator) => {
    return new Promise((resolve, reject) => {
      const validation = validator.validate(this.userData);
      if (validation.error) {
        reject(validation.error.message);
      } else resolve();
    });
  };

  saveDataInDB = () => {
    return new Promise((resolve, reject) => {
      let query =
        'INSERT INTO tb_category(catName, rank, storeId) VALUES (?,?,?)';
      let values = [
        this.userData.catName,
        this.userData.rank,
        this.userData.storeId
      ];

      insertRecordInDB(TAG.CATEGORY.ADD_CATEGORY, query, values, true)
        .then((result) => {
          this.userData.catId = result;
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  updateCategoryData = () => {
    return new Promise((resolve, reject) => {
      let query =
        'UPDATE tb_category SET catName=?,rank=?,storeId=? WHERE catId= ?';
      let values = [
        this.userData.catName,
        this.userData.rank,
        this.userData.storeId,
        this.userData.catId
      ];

      updateRecordInDB(TAG.CATEGORY.UPDATE_CATEGORY, query, values)
        .then((result) => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  getAllCategoriesData = () => {
    return new Promise((resolve, reject) => {
      let query = 'SELECT * FROM tb_category';

      getRecordFromDB(TAG.CATEGORY.GET_ALL_CATEGORY, query, null)
        .then((result) => {
          const categoryList = [];
          if (result.length) {
            this.json = JSON.parse(JSON.stringify(result));
            this.json.forEach((element) => {
              categoryList.push(element);
            });
          }
          resolve(categoryList);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  getSingleCategoryDetails = () => {
    return new Promise((resolve, reject) => {
      let query = 'SELECT * FROM tb_category WHERE catId= ?';
      let values = [this.userData.catId];
      getRecordFromDB(TAG.STORE.GET_SINGLE_STORE, sql, values)
        .then((result) => {
          if (result.length) {
            this.json = JSON.parse(JSON.stringify(result));
            Object.assign(this.userData, this.json[0]);
            resolve();
          } else reject(apiMessages.messages.NO_CATEGORY_FOUND);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  getResponse = (categoryList) => {
    return new Promise((resolve, reject) => {
      if (categoryList)
        if (categoryList == 4) resolve(this.json);
        else
          resolve({
            count: categoryList.length,
            categoryList: categoryList
          });
      else resolve(this.userData);
    });
  };
}

module.exports = CategoryModel;
