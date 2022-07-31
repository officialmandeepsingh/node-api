const getProductList = (req, res, next) => {
    res.json({
        status: 200,
        message: "Get All Product List",
        data: {}

    })
}

module.exports = getProductList