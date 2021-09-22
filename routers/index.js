const routers = require("express").Router();
const likesRouter = require("./likesRouter");
const matchesRouter = require("./matchesRouter");

routers.use("/likes", likesRouter);
routers.use("/matches", matchesRouter);

module.exports = routers;
