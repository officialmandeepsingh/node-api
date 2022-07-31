const { StoreModel } = require('./../../../models')
const { editStoreValidator } = require('./../../../Schema')
const editStore = (req, res, next) => {
  const storeModel = new StoreModel(req.body)

  storeModel
    .validate(editStoreValidator)
    .then(() => {
      return storeModel.updateStoreData()
    })
    .then(() => {
      return storeModel.getResponse()
    })
    .then((response) => {
      res.json({
        status: 200,
        message: 'Store Update Successfully',
        data: {}
      })
    })
    .catch((err) => {
      console.log('Exception Occur: ' + err);
      const error = new Error(err)
      error.statusCode = 400
      return next(error)
    })
}

module.exports = editStore
