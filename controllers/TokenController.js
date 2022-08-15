const { getRecordFromDB } = require('../configuration')
const jwt = require('./../configuration/jwtToken')
const MESSAGES = require('./../utils/constants/ApiMessages')
const TAG = require('./../utils/constants/Tags')

verifyUserToken = (req, res, next) => {
	console.log(req.headers)
	if (req.headers['token']) {
		jwt
			.verifyJwtToken(req.headers['token'])
			.then((decodeData) => {
				if (req.method === 'POST') req.body['customerDetails'] = decodeData
				else if (req.method === 'GET') req.query['customerDetails'] = decodeData
				const sql = 'SELECT * FROM tb_users where cusId = ? and authToken = ?'
				return getRecordFromDB(TAG.ON_BOARD.VERIFY_TOKEN, sql, [
					decodeData['cusId'],
					req.headers['token']
				])
			})
			.then((result) => {
				if (result.length) next()
				else reject(MESSAGES.messages.ALREADY_LOGIN)
			})
			.catch((err) => {
				const error = new Error(MESSAGES.messages.USER_UNAUTHORIZED)
				error.statusCode = 401
				return next(error)
			})
	} else {
		const error = new Error(MESSAGES.messages.TOKEN_REQUIRED)
		error.statusCode = 400
		return next(error)
	}
}

module.exports = verifyUserToken
