const { MongoClient } = require("mongodb");

const settings = {
  development: {
    uri: process.env.DATABASE_URI_DEVELOPMENT,
    databaseName: process.env.DATABASE_NAME_DEVELOPMENT,
    collection: process.env.DATABASE_COLLECTION_DEVELOPMENT
  },
  test: {
    uri: process.env.DATABASE_URI_TEST,
    databaseName: process.env.DATABASE_NAME_TEST,
    collection: process.env.DATABASE_COLLECTION_TEST
  }
}

const db = ({ uri, databaseName }) => {
  const client = new MongoClient(uri);
  return {
    database: null,
    run: () => {
      return new Promise((res, rej) => {
        client
          .connect()
          .then((clientData) => {
            this.database = clientData.db(databaseName);
            res("Success");
          })
          .catch((err) => {
            rej(err);
          });
      });
    },
    getDB: () => {
      return this.database;
    },
    closeDb: () => {
      client.close();
    },
  };
};

module.exports = {
  db,
  settings
};