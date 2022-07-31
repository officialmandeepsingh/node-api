const { Router } = require('express')
const {
  addFavourite,
  removeFavourite,
  viewAllFavourite
} = require('../../controllers')

const router = Router()

router
// .post('/addFavourite', addFavourite)
// .post('/removeFavourite', removeFavourite)
// .get('/viewAllFavourite', viewAllFavourite)

module.exports = router
