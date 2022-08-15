const TAG = require('../../../utils/constants/Tags')
const MESSAGE = require('../../../utils/constants/ApiMessages')
const CONSTANT = require('../../../utils/constants/constants')
const {
	getRecordFromDB,
	insertRecordInDB,
	updateRecordInDB,
	removeRecordFromDB
} = require('../../../configuration')

class Favourite {
	constructor(data) {
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

	addOrRemoveProduct = () => {
		return new Promise((resolve, reject) => {
			switch (parseInt(this.userData.status)) {
				case CONSTANT.FAVOURITES.ADD:
					this.addProductInFavourites()
						.then(() => resolve())
						.catch((err) => reject(err))
					break
				case CONSTANT.FAVOURITES.REMOVE:
					this.removeProductInFavourites()
						.then(() => resolve())
						.catch((err) => reject(err))
					break
				default:
					reject()
			}
		})
	}

	addProductInFavourites = () => {
		return new Promise((resolve, reject) => {
			const sql =
				'INSERT INTO tb_favourite(prodId, cusId, storeId) VALUES (?,?,?)'
			const values = [
				this.userData.prodId,
				this.userData.customerDetails.cusId,
				this.userData.storeId
			]
			insertRecordInDB(TAG.FAVOURITES.ADD_FAVOURITES, sql, values, true)
				.then((result) => {
					this.userData.favId = result
					resolve()
				})
				.catch((err) => reject(err))
		})
	}

	removeProductInFavourites = () => {
		return new Promise((resolve, reject) => {
			const sql =
				'delete from tb_favourite where prodId = ? and cusId = ? and storeId = ?'
			const values = [
				this.userData.prodId,
				this.userData.customerDetails.cusId,
				this.userData.storeId
			]
			removeRecordFromDB(TAG.FAVOURITES.REMOVE_FAVOURITES, sql, values)
				.then((result) => resolve())
				.catch((err) => reject(err))
		})
	}

	getAllProductInFavourites = () => {
		return new Promise((resolve, reject) => {
			const sql = 'select * from tb_favourite where cusId = ? and storeId = ?'
			const values = [
				this.userData.customerDetails.cusId,
				this.userData.storeId
			]
			getRecordFromDB(TAG.FAVOURITES.GET_ALL_FAVOURITES, sql, values)
				.then((result) => {
					const favouritesList = []
					if (result.length) {
						const list = JSON.parse(JSON.stringify(result))
						list.forEach((item) => {
							favouritesList.push(item)
						})
					}
					resolve(favouritesList)
				})
				.catch((err) => reject(err))
		})
	}

	getAddOrRemoveResponse = () => {
		return new Promise((resolve, reject) => {
			switch (parseInt(this.userData.status)) {
				case CONSTANT.FAVOURITES.ADD:
					this.getResponse(CONSTANT.BASIC_OPERATION.INSERT).then((result) => {
						delete this.userData['customerDetails']
						resolve({
							data: this.userData,
							operations: CONSTANT.FAVOURITES.ADD
						})
					})
					break
				case CONSTANT.FAVOURITES.REMOVE:
					this.getResponse(CONSTANT.BASIC_OPERATION.REMOVE).then(() => {
						resolve({ data: {}, operations: CONSTANT.FAVOURITES.REMOVE })
					})
					break
			}
		})
	}

	getResponse = (operations, favouritesList = []) => {
		return new Promise((resolve, reject) => {
			switch (operations) {
				case CONSTANT.BASIC_OPERATION.INSERT:
					resolve(this.userData)
					break
				case CONSTANT.BASIC_OPERATION.SELECT:
					resolve({
						counts: favouritesList.length,
						favouriteProducts: favouritesList
					})
					break
				case CONSTANT.BASIC_OPERATION.UPDATE:
					resolve()
					break
				case CONSTANT.BASIC_OPERATION.REMOVE:
					resolve()
					break
				default:
					resolve(this.userData)
					break
			}
		})
	}
}

module.exports = Favourite
