const { authRoutes } = require('./customer')
const { dateTimeConvertor } = require('../controllers')

module.exports = (app) => {
    app.use('/api/customer', authRoutes)
    app.use('/datetime/:date', dateTimeConvertor)
}