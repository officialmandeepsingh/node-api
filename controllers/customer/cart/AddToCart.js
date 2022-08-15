const addToCart = (req, res, next)=>{
    res.json({
        status: 200,
        message: 'Add to Cart successfully',
        data: {}
      });
}

module.exports = addToCart