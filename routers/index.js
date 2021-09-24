const routers = require("express").Router();
const authentication = require("../middleware/authentication");
const likesRouter = require("./likesRouter");
const matchesRouter = require("./matchesRouter");

routers.use("/likes", authentication, likesRouter);
routers.use("/matches", authentication, matchesRouter);

module.exports = routers;
