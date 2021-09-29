const { mongoDB } = require(".");
const { settings } = require("../db/config");

class Likes {
  static findAll() {
    const matcher = mongoDB
      .getDB()
      .collection(settings[process.env.NODE_ENV]["collection"]);
    return matcher.find().toArray();
  }
  static findById(id) {
    const matcher = mongoDB
      .getDB()
      .collection(settings[process.env.NODE_ENV]["collection"]);
    return matcher.find({ _id: { $eq: +id } }).toArray();
  }
  static create(data) {
    const matcher = mongoDB
      .getDB()
      .collection(settings[process.env.NODE_ENV]["collection"]);
    return matcher.insertOne(data);
  }
  static update(id, data) {
    const matcher = mongoDB
      .getDB()
      .collection(settings[process.env.NODE_ENV]["collection"]);
    return matcher.updateOne({ _id: id }, { $set: data });
  }
  static destroy(id) {
    const matcher = mongoDB
      .getDB()
      .collection(settings[process.env.NODE_ENV]["collection"]);
    return matcher.deleteOne({ _id: id });
  }
}

module.exports = Likes;
