require("dotenv").config();
const express = require("express");
const LikesController = require("./controllers/likes");
const MatchesController = require("./controllers/matches");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/likes/:id", LikesController.getLikesById);
app.get("/likes", LikesController.getAllLikes);
app.post("/likes", LikesController.createLikes);

module.exports = app;
