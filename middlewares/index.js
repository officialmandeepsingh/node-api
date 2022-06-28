const morgan = require('morgan');
const express = require('express');
const {infoLogger} = require('./../configuration');
const { json } = require('express');
const responseTime = require('response-time')

morgan.token('accessToken', function getUsertoken(req) {
  return req.headers['access-token']
})

morgan.token('payload', function getPayload(req) {
  return JSON.stringify(req.body)
})


module.exports = {
  middleware: (app) => {
    app.use(morgan('Data: :date[web] Route Details: :method :url :status :response-time User Token: :accessToken Payload: :payload basic Details: :user-agent - :res[content-length] bytes - :response-time ms', { stream: infoLogger.stream }))
    app.use(express.json())
    app.use(responseTime())
  }

}