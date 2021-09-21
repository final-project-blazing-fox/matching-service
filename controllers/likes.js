const Likes = require("../model/likes");

class LikesController {
  static getAllLikes(req, res, next) {
    Likes.findAll()
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
      .catch((err) => {
        next({ name: "INTERNAL SERVER ERROR" });
      });
  }
  static getLikesById(req, res) {
    const { id } = req.params;
    Likes.findById(id)
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
      .catch((err) => {
        next({ name: "INTERNAL SERVER ERROR" });
      });
  }
  static createLikes(req, res) {
    Likes.create({
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
      .catch((err) => {
        next({ name: "INTERNAL SERVER ERROR" });
      });
  }
  static updateLikes(req, res) {
    const { likes } = req.body;
    const { id } = req.params;
    Likes.update(+id, { ...req.body })
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
      .catch((err) => {
        console.log(err);
      });
  }
  static deleteLikes(req, res) {
    const { id } = req.params;
    Likes.destroy(+id)
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
      .catch((err) => {
        next({ name: "INTERNAL SERVER ERROR" });
      });
  }
}

module.exports = LikesController;
