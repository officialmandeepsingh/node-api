const { onBoardValidator } = require('../Schema')
const { database } = require('../configuration')
const otpGenerator = require('otp-generator')
const { query } = require('../configuration/logger')

class OnBoard {
    constructor(userData) {
        this.userData = { ...userData }
    }

    generateOtpCode = () => {
        return new Promise((resolve, reject) => {
            resolve(otpGenerator.generate(4,{ upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false }))
        })
    }

    saveUserInDb = (otpCode) => {
        return new Promise((resolve, reject) => {
            console.log(otpCode);
            let sql = 'INSERT INTO tb_user_session (phoneNumber, countryCode, deviceToken, otpCode) VALUES (?,?,?,?)';
            let values = [this.userData.phoneNumber, this.userData.countryCode, this.userData.deviceToken, otpCode]
            const query = database.query(sql, values, (error, result) => {
                if (error) {
                    reject(error.sqlMessage)
                }
                else {
                    console.log(query);
                    console.log(result);                   
                    resolve(result.insertId)
                }
            })


        })
    }

    getUserDataFromDb = (insertId) =>{
        return new Promise((resolve, reject) => {
          
            let sql = 'select * from tb_user_session where sessId = ?';
            let values = [insertId]
            database.query(sql, values,(error, result,rows) => {
                if (error) {
                    reject(error.sqlMessage)
                }
                else {
                    try{
                        var json =  JSON.parse(JSON.stringify(result))                
                        console.log("Parse: "+json[0].sessId);                   
                        resolve(json[0])
                    }catch(exception){
                        reject(exception)
                    }
                    
                }

            })


        })
    }

    validate = () => {
        return new Promise((resolve, reject) => {
            const validation = onBoardValidator.validate(this.userData);
            if (validation.error) {
                reject(validation.error.message);
            } else
                resolve(true)
        })
    }

    getResponse = (sessionId) => {
        return new Promise((resolve, reject) => {
            // delete this.userData['countryCode']
            // delete this.userData['phoneNumber']
            // delete this.userData['deviceToken']
            let response ={}
            response['sessionId'] = sessionId
            resolve(response)
        })
    }

}

module.exports = OnBoard 