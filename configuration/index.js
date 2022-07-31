const {
  getRecordFromDB,
  insertRecordInDB,
  updateRecordInDB,
  removeRecordFromDB
} = require('./database');

module.exports = {
  infoLogger: require('./logger'),
  token: require('./jwtToken'),
  getRecordFromDB: getRecordFromDB,
  insertRecordInDB: insertRecordInDB,
  updateRecordInDB: updateRecordInDB,
  removeRecordFromDB: removeRecordFromDB
};
