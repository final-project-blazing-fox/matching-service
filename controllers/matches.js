const Matches = require("../model/matches");

class MatchesController {
  static getMatchesById(req, res, next) {
    const { id } = req.params;
    Matches.findById(id)
      .then((data) =>
        res.status(200).json({
          meta: {
            success: true,
          },
          body: {
            matches: data,
          },
        })
      )
      .catch(() => {
        next({ name: "INTERNAL SERVER ERROR" });
      });
  }
}

module.exports = MatchesController;
