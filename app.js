const { json } = require('express')
const express = require('express')
const routes = require('./routes')
const { middleware } = require('./middlewares')
const createError = require('http-errors')

require('dotenv').config()

const app = express()


middleware(app)
routes(app)


app.use((req, res, next) => {
  const error = createError(400);
  next(error);
})



app.use(

  (error, req, res, next) => {
    // logger.error(error.message);

    res.statusCode = error.statusCode;
    res.json({
      status: error.statusCode,
      message: error.message,
      data: { }
    });
  })

app.listen(process.env.PORT || 3000, () => {

  console.log(`Example app listening on port: ${process.env.PORT || 3000}!`)
}
)
