const { Router } = require('express')
const {
	addFavouriteController,
	removeFavouriteController,
	viewAllFavouriteController,
	verifyUserTokenController
} = require('../../controllers')

const router = Router()

router
	.post('/addFavourite', verifyUserTokenController, addFavouriteController)
	.post(
		'/removeFavourite',
		verifyUserTokenController,
		removeFavouriteController
	)
	.get(
		'/viewAllFavourite',
		verifyUserTokenController,
		viewAllFavouriteController
	)

module.exports = router
