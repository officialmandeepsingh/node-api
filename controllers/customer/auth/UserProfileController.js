const { UserProfile } = require('../../../models')

const userProfile = (req,res,next) => {
    const userProfile = new UserProfile(req.body)

    userProfile
    .validate()
    .then(() => {
        return userProfile.saveInDb()
    })
    // .then(() => {
    //     return userProfile.saveUpdateAuthTokenInDb()
    // })
    .then(() => {
        return userProfile.getResponse()
    })
    .then((result) => {
        res.json({
            status: 200,
            message: "Execution Successfully",
            data: result
        })
    })
    .catch((err) => {
        const error = new Error(err);
            error.statusCode = 400;
            return next(error);
    })
}

module.exports = userProfile