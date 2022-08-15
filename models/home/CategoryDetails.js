const {
	getRecordFromDB,
	updateRecordInDB,
	insertRecordInDB,
	removeRecordFromDB
} = require('../../configuration')
const TAG = require('./../../utils/constants/Tags')
class CategoryDetailsModel {
	constructor(userDate) {
		this.userDate = { ...userDate }
	}

	validate = (validate) => {
		return new Promise((resolve, reject) => {
			const valid = validate.validate(this.userDate)
			if (valid.error) reject(valid.error.message)
			else resolve()
		})
	}

	getSubCategories = () => {
		return new Promise((resolve, reject) => {
			const sql = `SELECT
            subcat.*,
			count(pro.prodId) as productCount,
            if(count(pro.prodId) >0,REPLACE (
                JSON_ARRAY(
                    GROUP_CONCAT(
                        JSON_OBJECT(
                            'prodId',
                            pro.prodId,
                            'prodName',
                            pro.prodName,
                            'stockQuantity',
                            pro.stockQuantity,
                            'sellingPrice',
                            pro.sellingPrice,
                            'actualPrice',
                            pro.actualPrice,
                            'weight',
                            pro.weight,
							'catId',pro.catId,
							'subCatId',pro.subCatId,
							'storeId',pro.storeId
                        )
                    )
                ),
                '\\\\',''
            ),JSON_ARRAY()) as products
        FROM tb_subcategory subcat
            left JOIN tb_product pro on subcat.subCatId = pro.subCatId and pro.catId = ?
        WHERE
            subcat.storeId = ? and subcat.catId = ?
        GROUP BY subcat.subCatId`
			const values = [
				this.userDate.catId,
				this.userDate.storeId,
				this.userDate.catId
			]
			getRecordFromDB(TAG.HOME.CATEGORY_DETAILS, sql, values)
				.then((result) => {
					const subCategoryList = []
					if (result.length) {
						this.json = JSON.parse(JSON.stringify(result))
						this.json.forEach((element) => {
							subCategoryList.push(element)
						})
					}
					resolve(subCategoryList)
				})
				.catch((err) => reject(err))
		})
	}

	getResponse = (subCategoryList) => {
		return new Promise((resolve, reject) => {
			if (subCategoryList) resolve(subCategoryList)
			else resolve(this.userDate)
		})
	}
}

module.exports = CategoryDetailsModel
