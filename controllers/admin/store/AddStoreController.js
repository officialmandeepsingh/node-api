const { StoreModel } = require('./../../../models');
const { storeValidator } = require('./../../../Schema');
const addStore = (req, res, next) => {
  const storeModel = new StoreModel(req.body);

  storeModel
    .validate(storeValidator)
    .then(() => {
      return storeModel.addStoreInDb();
    })
    .then(() => {
      return storeModel.getResponse();
    })
    .then((response) => {
      res.json({
        status: 200,
        message: 'Execution Successfully',
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

module.exports = addStore;
