const Matches = require("../model/matches");

class MatchesController {
  static getMatchesById(req, res) {
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
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = MatchesController;
