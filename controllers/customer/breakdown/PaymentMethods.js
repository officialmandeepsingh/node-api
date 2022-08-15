const paymentMethods = (req, res, next) => {
    res.status(200).json({
        status: 200,
        message: 'Payment methods are available',
        data: {}
    })
}

module.exports = paymentMethods