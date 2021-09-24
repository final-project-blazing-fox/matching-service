const router = require("express").Router();
const MatchesController = require("../controllers/matches");

router.get("/:id", MatchesController.getMatchesById);

module.exports = router;
