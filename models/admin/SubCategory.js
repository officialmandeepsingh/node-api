const {
  getRecordFromDB,
  updateRecordInDB,
  insertRecordInDB,
  removeRecordFromDB
} = require('../../configuration');
const TAG = require('../../utils/constants/Tags');
const apiMessages = require('../../utils/constants/ApiMessages');

class SubCategoryModel {
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
      let sql =
        'INSERT INTO tb_subcategory(subCatName, rank, storeId, catId) VALUES (?,?,?,?)';
      let values = [
        this.userData.subCatName,
        this.userData.rank,
        this.userData.storeId,
        this.userData.catId
      ];

      insertRecordInDB(TAG.SUB_CATEGORY.ADD_SUB_CATEGORY, sql, values, true)
        .then((result) => {
          this.userData.subCatId = result;
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  updateSubCategoryData = () => {
    return new Promise((resolve, reject) => {
      let sql =
        'UPDATE tb_subcategory SET subCatName=?,rank=?,storeId=?, catId= ? WHERE subCatId= ?';
      let values = [
        this.userData.subCatName,
        this.userData.rank,
        this.userData.storeId,
        this.userData.catId,
        this.userData.subCatId
      ];

      updateRecordInDB(TAG.SUB_CATEGORY.UPDATE_SUB_CATEGORY, sql, values)
        .then((result) => {
          resolve();
        })
        .catch((error) => reject(error));
    });
  };

  getAllSubCategoriesData = () => {
    return new Promise((resolve, reject) => {
      let sql = 'SELECT * FROM tb_subcategory';

      getRecordFromDB(TAG.SUB_CATEGORY.GET_ALL_SUB_CATEGORY, sql, null)
        .then((result) => {
          const subCategoryList = [];
          if (result.length) {
            this.json = JSON.parse(JSON.stringify(result));
            this.json.forEach((element) => {
              subCategoryList.push(element);
            });
          }
          resolve(subCategoryList);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  getSingleSubCategoryDetails = () => {
    return new Promise((resolve, reject) => {
      let sql = 'SELECT * FROM tb_subcategory WHERE subCatId= ?';
      let values = [this.userData.subCatId];

      getRecordFromDB(TAG.SUB_CATEGORY.GET_SUB_CATEGORY_DETAILS, sql, values)
        .then((result) => {
          if (result.length) {
            this.json = JSON.parse(JSON.stringify(result));
            Object.assign(this.userData, this.json[0]);
            resolve();
          } else reject(apiMessages.messages.NO_SUB_CATEGORY_FOUND);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  getResponse = (subCategoryList) => {
    return new Promise((resolve, reject) => {
      if (subCategoryList)
        if (subCategoryList == 3) resolve(this.json);
        else
          resolve({
            count: subCategoryList.length,
            subCategoryList: subCategoryList
          });
      else resolve(this.userData);
    });
  };
}

module.exports = SubCategoryModel;
