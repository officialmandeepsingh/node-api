const { Router } = require('express')
const { getProductList, viewproductdetail } = require('../../controllers')
const router = Router()

router
  //   .post('/addproduct', addproduct)
  .get('/viewproductdetail/:productid', viewproductdetail)
  //   .post('/updateproductdetail/:productid', updateproductdetail)
  //   .delete('/deleteproductdetail/:productid', deleteproductdetail)
  .get('/getproductlist', getProductList)

module.exports = router
