const {
	getRecordFromDB,
	insertRecordInDB,
	updateRecordInDB,
	removeRecordFromDB
} = require('../../../configuration')

const CONSTANTS = require('../../../utils/constants/constants')
const TAGS = require('../../../utils/constants/Tags')

class CustomerAddress {
	constructor(data, headers) {
		this.userData = { ...data }
	}

	validate = (validator) => {
		return new Promise((resolve, reject) => {
			const validation = validator.validate(this.userData)
			if (validation.error) {
				reject(validation.error.message)
			} else resolve()
		})
	}

	addNewAddress = () => {
		return new Promise((resolve, reject) => {
			const sql =
				'INSERT INTO tb_cus_address(cusId, address, addressType, latitude, longitude, landmark, country, pinCode, addressName) VALUES (?,?,?,?,?,?,?,?,?)'
			const values = [
				this.userData.customerDetails.cusId,
				this.userData.address,
				this.userData.addressType,
				this.userData.latitude,
				this.userData.longitude,
				this.userData.landmark || '',
				this.userData.country,
				this.userData.pinCode || '',
				this.userData.addressName || ''
			]

			insertRecordInDB(TAGS.ADDRESS.ADD_NEW_ADDRESS, sql, values, true)
				.then((result) => {
					this.userData.cusAddressId = result
					resolve()
				})
				.catch((err) => {
					reject(err)
				})
		})
	}

	getAllAddress = () => {
		return new Promise((resolve, reject) => {
			console.log(this.userData.customerDetails.cusId)
			const sql =
				'select * from tb_cus_address where cusId = ? order by cusAddressId desc'
			getRecordFromDB(TAGS.ADDRESS.GET_ALL_USER_ADDRESSES, sql, [
				this.userData.customerDetails.cusId
			])
				.then((result) => {
					const addressList = []
					if (result) {
						const list = JSON.parse(JSON.stringify(result))
						list.forEach((element) => {
							addressList.push(element)
						})
					}
					resolve(addressList)
				})
				.catch((err) => {
					reject(err)
				})
		})
	}

	setDefaultAddress = () => {
		return new Promise((resolve, reject) => {
			const sql = `UPDATE tb_cus_address 
			SET isDefault = CASE WHEN cusAddressId = ? THEN 1 else 0 END     
			WHERE cusId = ?;`
			updateRecordInDB(TAGS.ADDRESS.UPDATE_ADDRESS, sql, [
				this.userData.cusAddressId,
				this.userData.customerDetails.cusId
			])
				.then(() => {
					resolve()
				})
				.catch((err) => {
					reject(err)
				})
		})
	}

	getResponse = (operations, addressList = []) => {
		delete this.userData['customerDetails']
		return new Promise((resolve, reject) => {
			switch (operations) {
				case CONSTANTS.BASIC_OPERATION.INSERT:
					resolve(this.userData)
					break
				case CONSTANTS.BASIC_OPERATION.SELECT:
					resolve({
						addressCount: addressList.length,
						addressList: addressList
					})
					break
				case CONSTANTS.BASIC_OPERATION.UPDATE:
					resolve(this.userData)
					break
				default:
					resolve()
			}
		})
	}
}
module.exports = CustomerAddress
