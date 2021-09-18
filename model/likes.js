const { mongoDB } = require(".");

class Likes {
  static findAll() {
    const matcher = mongoDB.getDB().collection(process.env.DATABASE_COLLECTION);
    return matcher.find().toArray();
  }
  static findById(id) {
    const matcher = mongoDB.getDB().collection(process.env.DATABASE_COLLECTION);
    return matcher.find({ _id: { $eq: +id } }).toArray();
  }
  static create(data) {
    const matcher = mongoDB.getDB().collection(process.env.DATABASE_COLLECTION);
    return matcher.insertOne(data);
  }
}

module.exports = Likes;
