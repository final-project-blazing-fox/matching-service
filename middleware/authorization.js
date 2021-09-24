const Likes = require("../model/likes");

const authorization = async (req, res, next) => {
  return Likes.findById(req.userId)
    .then(({ data }) => {
      if (!data) {
        throw new Error({ name: "NOT_AUTHORIZED" });
      } else {
        next();
      }
    })
    .catch((err) => {
      next({ name: "INTERNAL SERVER ERROR" });
    });
};

module.exports = authorization;
