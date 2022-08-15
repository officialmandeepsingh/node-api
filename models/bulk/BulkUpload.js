const {
  getRecordFromDB,
  updateRecordInDB,
  insertRecordInDB,
  removeRecordFromDB,
} = require("../../configuration");
const apiMessages = require("../../utils/constants/ApiMessages");
const TAG = require("../../utils/constants/Tags");
const fs = require("fs");
const { parse } = require("csv-parse");

class BulkUpload {
  getStoreData = (path, req) => {
    return new Promise((resolve, reject) => {
      const storeList = [];

      req.files.store.mv(path, (err) => {
        console.log("req.files:=> store => " + err);
      });

      setTimeout(() => {
        fs.createReadStream(path)
          .pipe(parse({ delimiter: ",", from_line: 2 }))
          .on("data", function (row) {
            storeList.push(row);
          })
          .on("error", (err) => {
            reject(err.message);
          })
          .on("end", () => {
            console.log("storeList:=> " + JSON.stringify(storeList));
            let sql =
              "INSERT INTO tb_store(storeId,storeName, storeAddress, emailId, countryCode, phoneNumber, latitude, longitude, isFreeDeliveryEnable, weight, deliveryRadius, baseDeliveryCharges, weightPerKg) VALUES ?";
            this.addDataInBulkDb(TAG.STORE.ADD_STORE_IN_BULK, sql, storeList)
              .then(() => {
                resolve(storeList.length);
              })
              .catch((err) => {
                reject(err);
              });
          });
      }, 100);
    });
  };

  getCategoryData = (path, req) => {
    return new Promise((resolve, reject) => {
      const categoryList = [];

      req.files.category.mv(path, (err) => {
        console.log("req.files:=> category => " + err);
      });

      setTimeout(() => {
        fs.createReadStream(path)
          .pipe(parse({ delimiter: ",", from_line: 2 }))
          .on("data", function (row) {
            categoryList.push(row);
          })
          .on("error", (err) => {
            reject(err.message);
          })
          .on("end", () => {
            console.log("categoryList:=> " + JSON.stringify(categoryList));
            var sql =
              "INSERT INTO tb_category(catId, catName, rank, storeId) VALUES ?";
            this.addDataInBulkDb(
              TAG.CATEGORY.ADD_CATEGORY_IN_BULK,
              sql,
              categoryList
            )
              .then(() => {
                resolve(categoryList.length);
              })
              .catch((err) => {
                reject(err);
              });
          });
      }, 100);
    });
  };

  getSubCategoryData = (path, req) => {
    return new Promise((resolve, reject) => {
      const subCategoryList = [];

      req.files.subCategory.mv(path, (err) => {
        console.log("req.files:=> subCategory => " + err);
      });

      setTimeout(() => {
        fs.createReadStream(path)
          .pipe(parse({ delimiter: ",", from_line: 2 }))
          .on("data", function (row) {
            subCategoryList.push(row);
          })
          .on("error", (err) => {
            reject(err.message);
          })
          .on("end", () => {
            console.log(
              "subCategoryList:=> " + JSON.stringify(subCategoryList)
            );
            var sql =
              "INSERT INTO tb_subcategory(subCatId, subCatName, rank, storeId, catId) VALUES ?";
            this.addDataInBulkDb(
              TAG.CATEGORY.ADD_SUB_CATEGORY_IN_BULK,
              sql,
              subCategoryList
            )
              .then(() => {
                resolve(subCategoryList.length);
              })
              .catch((err) => {
                reject(err);
              });
          });
      }, 100);
    });
  };

  getProductData = (path, req) => {
    return new Promise((resolve, reject) => {
      const productList = [];
      req.files.product.mv(path, (err) => {
        console.log("req.files:=> product => " + err);
      });

      setTimeout(() => {
        fs.createReadStream(path)
          .pipe(parse({ delimiter: ",", from_line: 2 }))
          .on("data", function (row) {
            productList.push(row);
          })
          .on("error", (err) => {
            reject(err.message);
          })
          .on("end", () => {
            console.log("productList:=> " + JSON.stringify(productList));
            var sql =
              "INSERT INTO tb_product(prodId, prodName, stockQuantity, sellingPrice, actualPrice, priceMargin, barCode, storeId, catId, subCatId, weight, quantityType, weightInKgs) VALUES ?";
            this.addDataInBulkDb(
              TAG.CATEGORY.ADD_PRODUCT_IN_BULK,
              sql,
              productList
            )
              .then(() => {
                resolve(productList.length);
              })
              .catch((err) => {
                reject(err);
              });
          });
      }, 100);
    });
  };

  addDataInBulkDb = (tag, sqlQuery, bulkList) => {
    return new Promise((resolve, reject) => {
      insertRecordInDB(tag, sqlQuery, [bulkList], true)
        .then((result) => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}

module.exports = BulkUpload;
