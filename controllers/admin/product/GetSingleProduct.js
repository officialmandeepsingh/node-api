const singleProductController = (req, res, next) => {
  res.json({
    success: 200,
    message: 'singleProductController',
    data: {}
  });
};

module.exports = singleProductController;
