const { StoreModel } = require('./../../../models');
const { singleStoreValidator } = require('./../../../Schema');

const removeStore = (req, res, next) => {
  const storeModel = new StoreModel(req.body);

  storeModel
    .validate(singleStoreValidator)
    .then(() => {
      return storeModel.removeStore();
    })
    .then(() => {
      return storeModel.getResponse();
    })
    .then((response) => {
      res.json({
        status: 200,
        message: 'Store Deleted Successfully',
        data: response
      });
    })
    .catch((err) => {
      console.log('Exception Occur: ' + err);
      const error = new Error(err);
      error.statusCode = 400;
      return next(error);
    });
};

module.exports = removeStore;
