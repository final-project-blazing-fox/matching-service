const { db, settings } = require("../db/config");

const mongoDB = db({
  uri: settings[process.env.NODE_ENV]["uri"],
  databaseName: settings[process.env.NODE_ENV]["databaseName"],
});

module.exports = { mongoDB };
