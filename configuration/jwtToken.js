const jwtwebToken = require("jsonwebtoken")

exports.createJwtToken = (data) =>{
    return jwtwebToken.sign(data,process.env.JWT_KEY)
}

exports.verifyJwtToken = (token) => {
    return jwtwebToken.verify(token,process.env.JWT_KEY)
}