const { OnBoard } = require('../../../models');

const onBoard = (req, res, next) => {
  const onBoard = new OnBoard(req.body);

  onBoard
    .validate()
    .then(() => {
      return onBoard.generateOtpCode();
    })
    .then((otpCode) => {
      return onBoard.saveUserInDb(otpCode);
    })
    .then((insertId) => {
      return onBoard.getUserDataFromDb(insertId);
    })
    .then((sessionId) => {
      return onBoard.getResponse(sessionId.sessId);
    })
    .then((onBoardResponse) => {
      res.json({
        status: 200,
        message: 'Execution Successfully',
        data: onBoardResponse
      });
    })
    .catch((err) => {
      console.log('Exception Occur: ' + err);
      const error = new Error(err);
      error.statusCode = 400;
      return next(error);
    });
};

module.exports = onBoard;
