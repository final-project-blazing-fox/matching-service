require("dotenv").config();
const express = require("express");
const { mongoDB } = require("./model/index");
const LikesController = require("./controllers/likes");
const MatchesController = require("./controllers/matches");

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/likes/:id", LikesController.getLikesById);
app.get("/likes", LikesController.getAllLikes);

mongoDB
  .run()
  .then(() => {
    app.listen(3000, () => {
      console.log(`Running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
