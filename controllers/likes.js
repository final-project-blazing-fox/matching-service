const Likes = require("../model/likes");

class LikesController {
  static getAllLikes(req, res) {
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
        console.log(err);
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
        console.log(err);
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
        console.log(err);
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
        console.log(err);
      });
  }
}

module.exports = LikesController;
