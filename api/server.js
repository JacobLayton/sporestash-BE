const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");

const itemRoutes = require("./routes/itemRoutes");
const orderRoutes = require("./routes/orderRoutes");
const customerRoutes = require("./routes/customerRoutes");

const server = express();

// Logger
server.use(logger("short"));

// Cors
server.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
server.use(bodyParser.json());

// Routes
server.use("/items", itemRoutes);
server.use("/orders", orderRoutes);
server.use("/customers", customerRoutes);

server.use("/", (req, res) => {
  res.send("Backend is running.");
});

module.exports = server;
