const {userValidator} = require('./../Schema')
// const { userValidator, logSchema } = require('../validator');

class User {
    constructor(userData) {
        this.userData = { ...userData }
    }

    saveUserInDb(cb) {
        //if error
        cb('error')

        //else
        cb()
    }

    static validate(userData) {
        return userValidator.validate(userData);
      }

}

module.exports = { User }