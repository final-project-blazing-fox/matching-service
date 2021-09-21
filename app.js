require("dotenv").config();
const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const routers = require("./routers");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routers);
app.use(errorHandler);

module.exports = app;
