const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

app.use(express.json());

const budgetController = require("./controllers/budgetController.js");

app.use("/transaction", budgetController);

app.get("/", (req, res) => {
  res.send("Hello World");
});

module.exports = app;
