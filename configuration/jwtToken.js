const jwtwebToken = require('jsonwebtoken')
const MESSAGE = require('../utils/constants/ApiMessages')
exports.createJwtToken = (data) => {
	return new Promise((resolve, reject) => {
		try {
			const token = jwtwebToken.sign(data, process.env.JWT_KEY)
			console.log(':=> Token generated: ' + token)
			resolve(token)
		} catch (err) {
			reject(MESSAGE.SOMETHING_WENT_WRONG)
		}
	})
}

exports.verifyJwtToken = (token) => {
	return new Promise((resolve, reject) => {
		try {
			const decodeToken = jwtwebToken.verify(token, process.env.JWT_KEY)
			console.log(':=> Token decoded: ' + JSON.stringify(decodeToken))
			resolve(decodeToken)
		} catch (err) {
			reject(MESSAGE.INVALID_TOKEN)
		}
	})
	// return jwtwebToken.verify(token, process.env.JWT_KEY)
}
