const {
	getRecordFromDB,
	updateRecordInDB,
	insertRecordInDB,
	removeRecordFromDB,
} = require("../../configuration");
const TAG = require("./../../utils/constants/Tags");
class categoryModel {
	constructor(userData) {
		this.userData = { ...userData };
	}

	validate = (validator) => {
		return new Promise((resolve, reject) => {
			const validation = validator.validate(this.userData);
			if (validation.error) reject(validation.error.message);
			else resolve(true);
		});
	};

	getCategoriesForHome = () => {
		return new Promise((resolve, reject) => {
			const sql = "select * from tb_category where storeId = ?";
			const values = [this.userData.storeId];
			getRecordFromDB(TAG.HOME.CATEGORY_FOR_HOME, sql, values)
				.then((result) => {
					const categoryList = [];
					if (result.length) {
						this.json = JSON.parse(JSON.stringify(result));
						this.json.forEach((element) => {
							categoryList.push(element);
						});
					}
					resolve(categoryList);
				})
				.catch((err) => reject(err));
		});
	};

	getResponse = (categoryList) => {
		return new Promise((resolve, reject) => {
			const responseSent = {};
			if (categoryList) {
				responseSent.bannerCount = 0;
				responseSent.featuredProductCount = 0;
				responseSent.categoryCount = categoryList.length;
				responseSent.bannerList = [];
				responseSent.featuredProductList = [];
				responseSent.categoryList = categoryList;
			}

			resolve(responseSent);
		});
	};
}

module.exports = categoryModel;
