const { store, editStore, singleStore } = require('./Store')
const { category, editCategory, singleCategory } = require('./Category')
const {
  subCategory,
  editSubCategory,
  singleSubCategory
} = require('./SubCategory')

module.exports = {
  //store Validators
  store,
  editStore,
  singleStore,
  //category Validators
  category,
  editCategory,
  singleCategory,
  //SubCategory Validators
  subCategory,
  editSubCategory,
  singleSubCategory
}
