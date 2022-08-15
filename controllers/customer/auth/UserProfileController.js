const { UserProfile } = require('../../../models')

const userProfile = (req, res, next) => {
	const model = new UserProfile(req.body)

	model
		.validate()
		.then(() => {
			return model.saveInDb()
		})
		.then(() => {
			return model.getResponse()
		})
		.then((result) => {
			res.json({
				status: 200,
				message: 'Execution Successfully',
				data: result
			})
		})
		.catch((err) => {
			const error = new Error(err)
			error.statusCode = 400
			return next(error)
		})
}

module.exports = userProfile
