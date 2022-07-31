const {
  getRecordFromDB,
  updateRecordInDB,
  insertRecordInDB,
  removeRecordFromDB
} = require('../../configuration');
const TAG = require('../../utils/constants/Tags');

class ProductModel {
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

  addProductInDb = () => {
    return new Promise((resolve, reject) => {
      let sql =
        'INSERT INTO tb_product(prodName, stockQuantity, sellingPrice, actualPrice, barCode, storeId, catId, subCatId, weight, quantityType, weightInKgs, priceMargin) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)';
      let values = [
        this.userData.productName,
        this.userData.stockQuantity,
        this.userData.sellingPrice,
        this.userData.actualPrice,
        this.userData.barCode,
        this.userData.storeId,
        this.userData.catId,
        this.userData.subCatId,
        this.userData.weight,
        this.userData.quantityType,
        this.userData.weight,
        this.userData.sellingPrice - this.userData.actualPrice
      ];

      insertRecordInDB(TAG.PRODUCT.ADD_PRODUCT, query, values, true)
        .then((result) => {
          this.userData.prodId = result;
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  getAllProductList = () => {
    return new Promise((resolve, reject) => {
      let sql = 'SELECT * FROM tb_product';

      getRecordFromDB(TAG.PRODUCT.GET_ALL_PRODUCT, query, null)
        .then((result) => {
          const productList = [];
          if (result.length) {
            this.json = JSON.parse(JSON.stringify(result));
            this.json.forEach((element) => {
              productList.push(element);
            });
          }
          resolve(productList);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  getResponse = (productList) => {
    return new Promise((resolve, reject) => {
      if (productList)
        resolve({
          count: productList.length,
          productList: productList
        });
      else resolve(this.userData);
    });
  };
}

module.exports = ProductModel;
