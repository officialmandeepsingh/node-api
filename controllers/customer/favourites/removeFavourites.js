const removeFavourite = (req,res,next) => {
    res.json({
        status: 200,
        message: "Remove Favourite"

    })
}

module.exports = removeFavourite