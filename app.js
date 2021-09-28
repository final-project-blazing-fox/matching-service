require("dotenv").config();
const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const routers = require("./routers");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routers);
app.use(errorHandler);

module.exports = app;
