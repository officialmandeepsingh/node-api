const mysql = require("mysql");
const infoLogger = require("./logger");
require("dotenv").config();
const apiMessages = require("./../utils/constants/ApiMessages");

let database = mysql.createPool({
  connectionLimit: process.env.CONNECTION_LIMIT,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

const getRecordFromDB = (TAG, sql, values) => {
  return new Promise((resolve, reject) => {
    const query = database.query(sql, values, (error, result) => {
      console.log("=> Get_Record :=> " + TAG, {
        SQL: query.sql,
        ERROR: error,
        RESULT: result,
      });

      if (error) reject(error.sqlMessage);
      else resolve(result);
    });
  }); //
};

const insertRecordInDB = (TAG, sql, values, onlyID = false) => {
  return new Promise((resolve, reject) => {
    const query = database.query(sql, values, (error, result) => {
      console.log("=> Insert_Record :=> " + TAG, {
        SQL: query.sql,
        ERROR: error,
        RESULT: result,
      });
      if (error) reject(error.sqlMessage);
      else {
        if (onlyID) resolve(result.insertId);
        else resolve(result);
      }
    });
  });
};

const updateRecordInDB = (TAG, sql, values, getEmptyResult = false) => {
  return new Promise((resolve, reject) => {
    const query = database.query(sql, values, (error, result) => {
      console.log("=> Update_Record :=> " + TAG, {
        SQL: query.sql,
        ERROR: error,
        RESULT: result,
      });
      if (error) reject(error);
      else if (getEmptyResult) resolve(result);
      else if (result.affectedRows >= 1) resolve();
      else reject(apiMessages.messages.SOMETHING_WENT_WRONG);
    });
  }); //
};

const removeRecordFromDB = (TAG, sql, values, getEmptyResult = false) => {
  return new Promise((resolve, reject) => {
    const query = database.query(sql, values, (error, result) => {
      console.log("=> Remove_Record :=> " + TAG, {
        SQL: query.sql,
        ERROR: error,
        RESULT: result,
      });
      if (error) reject(error.sqlMessage);
      else if (result.affectedRows >= 1) resolve();
      else if (getEmptyResult) resolve();
      else reject(apiMessages.messages.SOMETHING_WENT_WRONG);
    });
  });
};

module.exports = {
  database,
  getRecordFromDB,
  insertRecordInDB,
  updateRecordInDB,
  removeRecordFromDB,
};
