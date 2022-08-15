const billingPayments = (req, res, next) => {
    res.status(200).json({
        status: 200,
        message: 'Billing Information',
        data: {}
    })
}

module.exports = billingPayments