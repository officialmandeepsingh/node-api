const { StoreModel } = require('../../../models');
const getAllStore = (req, res, next) => {
  const storeModel = new StoreModel(req.query);

  storeModel
    .getAllStores()
    .then((storesList) => {
      return storeModel.getResponse(storesList);
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

module.exports = getAllStore;
