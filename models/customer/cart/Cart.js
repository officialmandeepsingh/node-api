const TAG = require("../../../utils/constants/Tags");
const MESSAGE = require("../../../utils/constants/ApiMessages");
const CONSTANT = require("../../../utils/constants/constants");
const {
  getRecordFromDB,
  insertRecordInDB,
  updateRecordInDB,
  removeRecordFromDB,
} = require("../../../configuration");

class Cart {
  constructor(data) {
    this.userData = { ...data };
  }

  validate = (validator) => {
    return new Promise((resolve, reject) => {
      const validation = validator.validate(this.userData);
      if (validation.error) {
        reject(validation.error.message);
      } else resolve();
    });
  };

  findUserCart = () => {
    return new Promise((resolve, reject) => {
      //this.userData.customerDetails.cusId
      let sql = "select cartId from tb_cus_cart where deviceToken = ?";
      const values = [this.userData.deviceToken];
      if (this.userData.customerDetails) {
        sql += " and cusId = ?";
        values.push(this.userData.customerDetails.cusId);
      }
      sql += " order by updateOn DESC limit 1";
      getRecordFromDB(TAG.CART.FIND_CART, sql, values)
        .then((response) => {
          // console.log(JSON.parse(JSON.stringify(response))[0]);
          if (response.length > 0) {
            this.userData.cartId = response[0].cartId;
            resolve(response[0].cartId);
          } else resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  updateOrCreateUserCart = (cartId) => {
    return new Promise((resolve, reject) => {
      //this.userData.customerDetails.cusId

      if (cartId) {
        // update Cart
        this.updateUserCart(cartId)
          .then(() => {
            resolve(cartId);
          })
          .catch((err) => {
            reject(err);
          });
      } else {
        //Create a new Cart
        this.createUserCart(cartId)
          .then((cartId) => {
            resolve(cartId);
          })
          .catch((err) => {
            reject(err);
          });
      }
    });
  };

  updateUserCart = (cartId) => {
    return new Promise((resolve, reject) => {
      const sql =
        "UPDATE tb_cus_cart SET cusId=?,deviceToken=?,storeId=? where cartId =?";
      const values = [
        this.userData.customerDetails
          ? this.userData.customerDetails.cusId
          : null,
        this.userData.deviceToken,
        this.userData.storeId,
        cartId,
      ];

      updateRecordInDB(TAG.CART.UPDATE_CART, sql, values)
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  createUserCart = () => {
    return new Promise((resolve, reject) => {
      const sql =
        "INSERT INTO tb_cus_cart(cusId, deviceToken, storeId) VALUES (?,?,?)";
      const values = [
        this.userData.customerDetails
          ? this.userData.customerDetails.cusId
          : null,
        this.userData.deviceToken,
        this.userData.storeId,
      ];
      insertRecordInDB(TAG.CART.ADD_TO_CART, sql, values, true)
        .then((cartId) => {
          this.userData.cartId = cartId;
          resolve(cartId);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  clearCartItems = () => {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM tb_cart_item WHERE cartId = ?";
      removeRecordFromDB(TAG.CART.DELETE_CART_ITEMS, sql, [
        this.userData.cartId,
      ])
        .then(() => {
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  addCartItems = () => {
    return new Promise((resolve, reject) => {
      const promiseArray = [];
      this.userData.cartItems.forEach((item, index) => {
        promiseArray.push(
          this.cartItem(item).catch((err) => {
            reject(err);
          })
        );
      });
      Promise.all(promiseArray).then((result) => {
        this.userData.cartItemsIds = JSON.stringify(result);
        resolve();
      });
    });
  };

  cartItem = (item) => {
    return new Promise((resolve, reject) => {
      const sql =
        "select * from tb_product where prodId = ? and catId = ? and subCatId =? ";
      const values = [item.prodId, item.catId, item.subCatId];
      getRecordFromDB(TAG.PRODUCT.GET_PRODUCT_DETAILS, sql, values)
        .then((result) => {
          if (result.length > 0) return this.insertCartItems(result[0], item);
          else reject("Invalid Product ID");
        })
        .then((itemId) => {
          resolve(itemId);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  insertCartItems = (res, item) => {
    return new Promise((resolve, reject) => {
      const sql =
        "INSERT INTO tb_cart_item(cartId,prodId,prodName,catId,subCatId,storeId,bookedQuantity,stockQuantity) VALUES(?,?,?,?,?,?,?,?)";
      const values = [
        this.userData.cartId,
        res.prodId,
        res.prodName,
        res.catId,
        res.subCatId,
        res.storeId,
        item.quantity,
        res.stockQuantity,
      ];
      insertRecordInDB(TAG.CART.ADD_TO_CART, sql, values, true)
        .then((itemId) => {
          resolve(itemId);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  updateCusCartWithItemIds = () => {
    return new Promise((resolve, reject) => {
      const sql = "UPDATE tb_cus_cart SET cartItemIds=? where cartId =?";
      const values = [this.userData.cartItemsIds, this.userData.cartId];
      updateRecordInDB(TAG.CART.UPDATE_CART, sql, values)
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  deleteCartItems = () => {
    return new Promise((resolve, reject) => {
      const sql = "delete from tb_cart_item where cartId = ?";
      const values = [this.userData.cartId];
      removeRecordFromDB(TAG.CART.DELETE_CART_ITEMS, sql, values, true)
        .then(() => {
          resolve();
        })
        .catch((err) => reject(err));
    });
  };

  getProductFromCart = () => {
    return new Promise((resolve, reject) => {
      const sql = `select sum(cartItem.bookedQuantity) as itemQuantity, COUNT(*) as itemCount,sum((pro.sellingPrice * cartItem.bookedQuantity)) as totalAmount, REPLACE ( JSON_ARRAY(GROUP_CONCAT(JSON_OBJECT(
                    'prodId', pro.prodId,'prodName',pro.prodName,'bookedQuantity',cartItem.bookedQuantity,'stockQuantity',pro.stockQuantity,
                    'sellingPrice',pro.sellingPrice,'actualPrice',pro.actualPrice,'weight',pro.weight,'catId',pro.catId,'subCatId',pro.subCatId,
							      'storeId',pro.storeId
                    ))), '\\\\','' ) as products 
                    from tb_cus_cart cart 
                    left Join tb_cart_item cartItem
                    on cartItem.cartId = cart.cartId
                    left join tb_product pro 
                    on pro.prodId = cartItem.prodId 
                    where cart.cartId = ?`;
      const values = [this.userData.cartId];
      getRecordFromDB(TAG.CART.GET_FROM_CART, sql, values, true)
        .then((result) => {
          this.userData = { ...this.userData, ...result[0] };
          resolve();
        })
        .catch((err) => reject(err));
    });
  };

  getResponse = () => {
    return new Promise((resolve, reject) => {
      delete this.userData.cartItemsIds;
      resolve(this.userData);
    });
  };
}

module.exports = Cart;
