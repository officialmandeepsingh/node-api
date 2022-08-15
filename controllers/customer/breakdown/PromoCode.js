const promoCode = (req, res, next) => {
  res.status(200).json({
    status: 200,
    message: "Promo Code",
    data: { name: req.files.file.name },
  });
};

module.exports = promoCode;
