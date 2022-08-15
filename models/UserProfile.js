const { userProfileValidator } = require('../Schema')
const { createJwtToken, verifyJwtToken } = require('../configuration/jwtToken')
const {
	getRecordFromDB,
	insertRecordInDB,
	updateRecordInDB,
	removeRecordFromDB
} = require('../configuration')
const { log } = require('../configuration/logger')
const token = require('../configuration/jwtToken')
const TAG = require('../utils/constants/Tags')
class userProfile {
	constructor(userData) {
		this.userData = { ...userData }
	}

	validate = () => {
		return new Promise((resolve, reject) => {
			const validation = userProfileValidator.validate(this.userData)
			if (validation.error) {
				reject(validation.error.message)
			} else resolve()
		})
	}

	saveInDb = () => {
		return new Promise((resolve, reject) => {
			token
				.createJwtToken({
					cusId: this.userData.customerDetails.cusId,
					countryCode: this.userData.countryCode,
					phoneNumber: this.userData.phoneNumber,
					deviceToken: this.userData.deviceToken,
					firstName: this.userData.firstName,
					lastName: this.userData.lastName
				})
				.then((authToken) => {
					this.userData.authToken = authToken
					const sql =
						'UPDATE tb_users SET firstName=?,lastName=?,emailId=?,deviceToken=?,authToken=?,phoneNumber=?,countryCode=? WHERE cusId = ?'
					const values = [
						this.userData.firstName,
						this.userData.lastName,
						this.userData.emailId,
						this.userData.deviceToken,
						this.userData.authToken,
						this.userData.phoneNumber,
						this.userData.countryCode,
						this.userData.customerDetails.cusId
					]
					return updateRecordInDB(TAG.OTP.UPDATE_USER_PROFILE, sql, values)
				})
				.then(() => resolve())
				.catch((error) => {
					reject(error)
				})
				.catch((err) => reject(err))
		})
	}

	getResponse = () => {
		return new Promise((resolve, reject) => {
			delete this.userData['customerDetails']
			resolve({ ...this.userData })
		})
	}

	saveUpdateAuthTokenInDb = () => {
		return new Promise((resolve, reject) => {
			createJwtToken({ ...this.userData })
				.then((token) => {
					this.userData.authToken = token
				})
				.catch((error) => {
					reject(error)
				})

			let sql = 'UPDATE tb_users SET authToken = ? WHERE cusId  = ?'
			let values = [token, custumerId]
			const db_query = database.query(sql, values, (error, result) => {
				console.log('Query Execute: ' + db_query.sql)
				if (error) {
					reject(error.sqlMessage)
				} else {
					resolve()
				}
			})
		})
	}
}

module.exports = userProfile
