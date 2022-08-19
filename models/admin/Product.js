const {
  getRecordFromDB,
  updateRecordInDB,
  insertRecordInDB,
  removeRecordFromDB,
} = require("../../configuration");
const TAG = require("../../utils/constants/Tags");
const CONSTANTS = require("../../utils/constants/constants");
const MESSAGES = require("../../utils/constants/ApiMessages");
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
        "INSERT INTO tb_product(prodName, stockQuantity, sellingPrice, actualPrice, barCode, storeId, catId, subCatId, weight, quantityType, weightInKgs, priceMargin) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
      let values = [
        this.userData.prodName,
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
        this.userData.sellingPrice - this.userData.actualPrice,
      ];

      insertRecordInDB(TAG.PRODUCT.ADD_PRODUCT, sql, values, true)
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
      let sql = "SELECT * FROM tb_product";

      getRecordFromDB(TAG.PRODUCT.GET_ALL_PRODUCT, sql, null)
        .then((result) => {
          let productList = [];
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

  getProductDetails = () => {
    return new Promise((resolve, reject) => {
      let sql = "SELECT * FROM tb_product where prodId = ?";
      getRecordFromDB(TAG.PRODUCT.GET_PRODUCT_DETAILS, sql, [
        this.userData.prodId,
      ])
        .then((result) => {
          if (result.length) resolve(JSON.parse(JSON.stringify(result))[0]);
          reject(MESSAGES.messages.PRODUCT_NOT_FOUND);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  getProductListSubCategoryWise = () => {
    return new Promise((resolve, reject) => {
      const sql =
        "SELECT * FROM tb_product where storeId = ? and catId = ? and subCatId = ?";
      const values = [
        this.userData.storeId,
        this.userData.catId,
        this.userData.subCatId,
      ];
      getRecordFromDB(TAG.PRODUCT.GET_ALL_PRODUCT, sql, values)
        .then((result) => {
          let productList = [];
          if (result.length) {
            this.json = JSON.parse(JSON.stringify(result));
            this.json.forEach((element) => {
              productList.push(element);
            });
          }

          productList.map((product) => {
            delete product.createdAt;
            delete product.updateOn;
          });
          resolve(productList);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  deleteProduct = () => {
    return new Promise((resolve, reject) => {
      const sql = "delete from tb_product where prodId = ?";
      removeRecordFromDB(TAG.PRODUCT.DELETE_PRODUCT, sql, this.userData.prodId)
        .then((result) => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  updateProduct = () => {
    return new Promise((resolve, reject) => {
      const sql = "update tb_product set ? where prodId = ?";
      removeRecordFromDB(TAG.PRODUCT.UPDATE_PRODUCT, sql, [
        this.userData,
        this.userData.prodId,
      ])
        .then((result) => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  getResponse = (operation, productList = null) => {
    return new Promise((resolve, reject) => {
      if (operation == CONSTANTS.PRODUCT.INSERT) resolve(this.userData);
      if (
        operation == CONSTANTS.PRODUCT.REMOVE ||
        operation == CONSTANTS.PRODUCT.UPDATE
      )
        resolve();
      if (operation == CONSTANTS.PRODUCT.SELECT) {
        resolve({
          count: productList.length,
          productList: productList,
        });
      }
      if (operation == CONSTANTS.PRODUCT.VIEW_DETAILS) {
        resolve(productList);
      }
    });
  };
}

module.exports = ProductModel;
