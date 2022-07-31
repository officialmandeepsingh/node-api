const categoryForHome = (req, res, next) => {
  res.json({
    status: 200,
    message: 'Category For Home',
    data: {}
  });
};

module.exports = categoryForHome;
