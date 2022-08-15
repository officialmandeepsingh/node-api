const {Router} = require('express')

const {
    promoCodeController,
	billPaymentsController,
	paymentMethodsController
  } = require('../../controllers')

  const router = Router()

  router
  .get('/getPromoCode',promoCodeController)
  .get('/getPaymentDetails', billPaymentsController)
  .get('/getPaymentMethods', paymentMethodsController)

  module.exports = router