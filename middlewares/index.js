const morgan = require("morgan");
const express = require("express");
const upload = require("express-fileupload");
const { infoLogger } = require("./../configuration");
const { json } = require("express");
const responseTime = require("response-time");

morgan.token("accessToken", function getUsertoken(req) {
  return req.headers["access-token"];
});

morgan.token("payload", function getPayload(req) {
  if (req.method === "POST") return JSON.stringify(req.body);
  else if (req.method === "GET") return JSON.stringify(req.params);
});

module.exports = {
  middleware: (app) => {
    app.use(
      morgan(
        ":date[web] :method :url :status :response-time User Token: :accessToken Payload: :payload basic Details: :user-agent - :res[content-length] bytes - :response-time ms",
        { stream: infoLogger.stream }
      )
    );
    app.use(express.json());
    app.use(responseTime());
    app.use(upload());
    app.use(express.urlencoded({ extended: true }));
  },
};
