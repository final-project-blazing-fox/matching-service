const { mongoDB } = require(".");
const { settings } = require("../db/config");

class Matches {
  static async findById(id) {
    const matcher = mongoDB
      .getDB()
      .collection(settings[process.env.NODE_ENV]["collection"]);
    const likes = await matcher.find({ _id: { $eq: +id } }).toArray();
    const likedAccounts = await matcher
      .find({ _id: { $in: likes[0].likes } })
      .toArray();
    const matches = likedAccounts
      .filter((account) => account.likes.includes(+id))
      .map((account) => account._id);
    return matches;
  }
}

module.exports = Matches;
