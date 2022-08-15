const { json } = require('express')
const express = require('express')
const routes = require('./routes')
const { middleware } = require('./middlewares')
const createError = require('http-errors')
const MESSAGE = require('./utils/constants/ApiMessages')
require('dotenv').config()

const app = express()
global.__basedir = __dirname + '/..'
middleware(app)
routes(app)

app.use((req, res, next) => {
	const error = createError(400)
	next(error)
})

app.use((error, req, res, next) => {
	// logger.error(error.message);

	res.statusCode = error.statusCode || 400
	res.json({
		status: error.statusCode || 400,
		message: error.message || MESSAGE.messages.SOMETHING_WENT_WRONG,
		data: {}
	})
})

app.listen(process.env.PORT || 3000, () => {
	console.log(`Example app listening on port: ${process.env.PORT || 3000}!`)
})
