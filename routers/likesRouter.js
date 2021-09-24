const router = require("express").Router();
const LikesController = require("../controllers/likes");
const authorization = require("../middleware/authorization");

router.get("/:id", LikesController.getLikesById);
router.get("/", LikesController.getAllLikes);
router.post("/", LikesController.createLikes);
router.patch("/:id", LikesController.updateLikes);
router.delete("/:id", LikesController.deleteLikes);

module.exports = router;
