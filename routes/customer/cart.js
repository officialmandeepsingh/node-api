const { Router } = require('express')
const {
    addToCartController,
    getFromCartController
  } = require('../../controllers')

  const router = Router()
  router
  .get('/getFromCart',getFromCartController)
  .post('/addToCart', addToCartController)

  module.exports = router