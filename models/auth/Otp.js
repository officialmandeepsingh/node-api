const otpGenerator = require('otp-generator')
const token = require('../../configuration/jwtToken')
const {
	getRecordFromDB,
	updateRecordInDB,
	insertRecordInDB,
	removeRecordFromDB
} = require('../../configuration')
const TAG = require('../../utils/constants/Tags')
const MESSAGE = require('../../utils/constants/ApiMessages')

class Otp {
	constructor(userData) {
		this.userData = { ...userData }
		this.json = {}
	}

	validate = (validator) => {
		return new Promise((resolve, reject) => {
			const validation = validator.validate(this.userData)
			if (validation.error) {
				reject(validation.error.message)
			} else resolve()
		})
	}

	reGenerateOtpCode = () => {
		return new Promise((resolve, reject) => {
			resolve(
				otpGenerator.generate(4, {
					upperCaseAlphabets: false,
					specialChars: false,
					lowerCaseAlphabets: false
				})
			)
		})
	}

	verifyOtp = () => {
		return new Promise((resolve, reject) => {
			let sql = 'select * from tb_user_session WHERE sessId = ? and otpCode= ?'
			let values = [this.userData.sessionId, this.userData.otpCode]

			getRecordFromDB(TAG.OTP.VERIFY_OTP, sql, values)
				.then((result) => {
					if (result.length) {
						this.json = JSON.parse(JSON.stringify(result))
						Object.assign(this.userData, this.json[0])
						resolve(this.json[0])
					} else reject(MESSAGE.messages.OTP_INCORRECT)
				})
				.catch((error) => {
					reject(error)
				})
		})
	}

	saveUserInDb = () => {
		return new Promise((resolve, reject) => {
			resolve('User Verified')
		})
	}

	checkUserExistance = () => {
		return new Promise((resolve, reject) => {
			let sql =
				'select * from tb_users WHERE phoneNumber = ? order by phoneNumber DESC'
			let values = [this.json[0].phoneNumber ? this.json[0].phoneNumber : 0]

			getRecordFromDB(TAG.OTP.CHECK_USER_EXISTENCE, sql, values)
				.then((result) => {
					if (result.length) {
						this.json = JSON.parse(JSON.stringify(result))
						Object.assign(this.userData, this.json[0])
						this.userData = { ...this.json[0], ...this.userData }
						resolve()
					} else {
						let sql =
							'INSERT INTO tb_users (phoneNumber, countryCode, deviceToken) VALUES (?,?,?)'
						let values = [
							this.json[0].phoneNumber,
							this.json[0].countryCode,
							this.json[0].deviceToken
						]

						insertRecordInDB(TAG.OTP.CREATE_USER_PROFILE, sql, values)
							.then((result) => {
								this.userData.cusId = result.insertId
								resolve()
							})
							.catch((error) => {
								reject(error)
							})
					}
				})
				.catch((err) => {
					reject(err)
				})
		})
	}

	createUserProfile = () => {
		return new Promise((resolve, reject) => {
			let sql =
				'INSERT INTO tb_users (phoneNumber, countryCode, deviceToken) VALUES (?,?,?)'
			let values = [
				this.json[0].phoneNumber,
				this.json[0].countryCode,
				this.json[0].deviceToken
			]

			insertRecordInDB(TAG.OTP.CREATE_USER_PROFILE, sql, values, true)
				.then((result) => {
					resolve(result)
				})
				.catch((error) => {
					reject(error)
				})
		})
	}

	generateAuthToken = () => {
		return new Promise((resolve, reject) => {
			token
				.createJwtToken({
					cusId: this.userData.cusId,
					countryCode: this.userData.countryCode,
					phoneNumber: this.userData.phoneNumber,
					deviceToken: this.userData.deviceToken
				})
				.then((token) => {
					this.userData.authToken = token
				})
				.catch((err) => {
					reject(err)
				})

			let sql = 'UPDATE tb_users SET authToken= ? WHERE cusId = ?'
			let values = [this.userData.authToken, this.userData.cusId]

			updateRecordInDB(TAG.OTP.USER_TOKEN_UPDATE, sql, values, true)
				.then((result) => {
					if (result.affectedRows >= 1) return this.deleteUserSessionFromDb()
					else reject(MESSAGE.messages.CUS_ID_INCORRECT)
				})
				.then((result) => {
					resolve()
				})
				.catch((error) => {
					reject(error)
				})
		})
	}

	deleteUserSessionFromDb = () => {
		return new Promise((resolve, reject) => {
			const sql = 'delete from tb_user_session where sessId = ?'
			const values = [this.userData.sessId]

			removeRecordFromDB(TAG.OTP.REMOVE_USER_SESSION, sql, values)
				.then(() => {
					resolve()
				})
				.catch((err) => reject(err))
		})
	}

	saveOtpCode = (otpCode) => {
		return new Promise((resolve, reject) => {
			let sql = 'UPDATE tb_user_session SET otpCode= ? WHERE sessId = ?'
			let values = [otpCode, this.userData.sessionId]
			updateRecordInDB(TAG.OTP.REGENERATE_OTP_SAVED, sql, values, true)
				.then((result) => {
					console.log('Log :=> ' + result)
					if (result.affectedRows >= 1) resolve()
					else reject(MESSAGE.messages.SESSION_ID_INCORRECT)
				})
				.catch((error) => {
					reject(error)
				})
		})
	}

	getVerifyResponse = () => {
		return new Promise((resolve, reject) => {
			delete this.userData['sessionId']
			delete this.userData['otpCode']
			delete this.userData['sessId']

			resolve({ ...this.userData })
		})
	}
}

module.exports = Otp
