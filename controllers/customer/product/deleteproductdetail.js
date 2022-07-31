const deleteProduct = (req, res, next) => {
    res.json({
        status: 200,
        message: "Delete Product List",
        data: {}

    })
}

module.exports = deleteProduct