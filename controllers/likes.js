const Likes = require("../model/likes");

class LikesController {
  static getAllLikes(_, res, next) {
    return Likes.findAll()
      .then((data) => {
        res.status(200).json({
          meta: {
            success: true,
          },
          body: {
            likes: data,
          },
        });
      })
      .catch(() => {
        next({ name: "INTERNAL SERVER ERROR" });
      });
  }
  static getLikesById(req, res, next) {
    const { id } = req.params;
    return Likes.findById(id)
      .then((data) =>
        res.status(200).json({
          meta: {
            success: true,
          },
          body: {
            likes: data,
          },
        })
      )
      .catch(() => {
        next({ name: "INTERNAL SERVER ERROR" });
      });
  }
  static createLikes(req, res, next) {
    return Likes.create({
      ...req.body,
      _id: +req.body._id,
    })
      .then((data) => {
        res.status(201).json({
          meta: {
            success: data.acknowledged,
          },
          body: {
            _id: data.insertedId,
          },
        });
      })
      .catch(() => {
        next({ name: "INTERNAL SERVER ERROR" });
      });
  }
  static updateLikes(req, res, next) {
    const { likes } = req.body;
    const { id } = req.params;

    return Likes.findById(id)
      .then((data) => {
        let existingLikes = data[0].likes;

        if (existingLikes) {
          let combinedLikes = [...likes, ...existingLikes];
          combinedLikes = [...new Set(combinedLikes)];
          return Likes.update(+id, { likes: combinedLikes });
        }
      })
      .then((data) => {
        res.status(201).json({
          meta: {
            status: data.acknowledged,
          },
          body: {
            _id: +id,
            likes: likes,
          },
        });
      })
      .catch(() => {
        next({ name: "INTERNAL SERVER ERROR" });
      });
  }
  static deleteLikes(req, res, next) {
    const { id } = req.params;
    return Likes.destroy(+id)
      .then((data) => {
        res.status(200).json({
          meta: {
            status: data.acknowledged,
          },
          body: {
            _id: +id,
          },
        });
      })
      .catch(() => {
        next({ name: "INTERNAL SERVER ERROR" });
      });
  }
}

module.exports = LikesController;
