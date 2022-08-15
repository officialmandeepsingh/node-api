const BulkUploadModel = require("../models/bulk");

const bulkUploadModel = new BulkUploadModel();

const bulkUpload = (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res
      .status(200)
      .send(
        "No files were uploaded.\n\nSend Params for upload in Bulks\n1) store for adding Stores\n2) product for adding Products\n3) category for adding categories\n4) subCategory for adding Sub Category"
      );
  } else {
    const date = new Date();
    const filePreFix =
      date.getDate().toString() +
      date.getMonth().toString() +
      date.getFullYear().toString() +
      date.getMilliseconds().toString();
    let path = "";
    let fileName;
    if (req.files.store) {
      path = "./files/stores/" + filePreFix + req.files.store.name;
      fileName = req.files.store.name;
      bulkUploadModel
        .getStoreData(path, req)
        .then((storeData) => {
          res.status(200).json({
            status: 200,
            message: "Stores Added successfully",
            data: {
              count: storeData,
            },
          });
        })
        .catch((err) => {
          const error = new Error(err);
          error.status = 400;
          return next(error);
        });
    } else if (req.files.product) {
      path = "./files/products/" + filePreFix + req.files.product.name;
      fileName = req.files.product.name;
      console.log(fileName);
      bulkUploadModel
        .getProductData(path, req)
        .then((storeData) => {
          res.status(200).json({
            status: 200,
            message: "Stores Added successfully",
            data: {
              count: storeData,
            },
          });
        })
        .catch((err) => {
          const error = new Error(err);
          error.status = 400;
          return next(error);
        });
    } else if (req.files.category) {
      path = "./files/category/" + filePreFix + req.files.category.name;
      fileName = req.files.category.name;
      bulkUploadModel
        .getCategoryData(path, req)
        .then((storeData) => {
          res.status(200).json({
            status: 200,
            message: "Stores Added successfully",
            data: {
              count: storeData,
            },
          });
        })
        .catch((err) => {
          const error = new Error(err);
          error.status = 400;
          return next(error);
        });
    } else if (req.files.subCategory) {
      path = "./files/subCategory/" + filePreFix + req.files.subCategory.name;
      fileName = req.files.subCategory.name;
      bulkUploadModel
        .getSubCategoryData(path, req)
        .then((storeData) => {
          res.status(200).json({
            status: 200,
            message: "Stores Added successfully",
            data: {
              count: storeData,
            },
          });
        })
        .catch((err) => {
          const error = new Error(err);
          error.status = 400;
          return next(error);
        });
    } else {
      return res.status(400).send("File not uploaded");
    }
  }
};

module.exports = bulkUpload;
