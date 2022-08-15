const getFromCart = (req, res, next)=>{
    res.json({
        status: 200,
        message: 'Get From Cart successfully',
        data: {}
      });
}

module.exports = getFromCart