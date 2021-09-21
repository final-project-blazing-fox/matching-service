const { MongoClient } = require("mongodb");
const testData = require("./test.json");

const settings = {
  development: {
    uri: process.env.DATABASE_URI_DEVELOPMENT,
    databaseName: process.env.DATABASE_NAME_DEVELOPMENT,
    collection: process.env.DATABASE_COLLECTION_DEVELOPMENT,
  },
  test: {
    uri: process.env.DATABASE_URI_TEST,
    databaseName: process.env.DATABASE_NAME_TEST,
    collection: process.env.DATABASE_COLLECTION_TEST,
  },
  production: {
    uri: process.env.DATABASE_URI_DEVELOPMENT,
    databaseName: process.env.DATABASE_NAME_DEVELOPMENT,
    collection: process.env.DATABASE_COLLECTION_DEVELOPMENT,
  },
};

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
    closeDB: () => {
      client.close();
    },
    bulkInsert: () => {
      const bulk = this.database
        .collection(settings[process.env.NODE_ENV]["collection"])
        .initializeUnorderedBulkOp();
      testData.forEach((data) => {
        bulk.insert(data);
      });
      bulk.execute();
    },
    dropCollection: async () => {
      const collections = (await this.database.listCollections().toArray()).map(
        (collection) => collection.name
      );
      if (collections.includes(settings[process.env.NODE_ENV]["collection"])) {
        this.database
          .collection(settings[process.env.NODE_ENV]["collection"])
          .drop();
      }
    },
  };
};

module.exports = {
  db,
  settings,
};
