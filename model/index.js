const { db } = require("../db/config");

const mongoDB = db({
  uri: process.env.DATABASE_URI,
  databaseName: process.env.DATABASE_NAME,
});

module.exports = { mongoDB };
