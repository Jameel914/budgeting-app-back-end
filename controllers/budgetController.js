const express = require("express");

const budget = express.Router();

const budgetArray = require("../models/budgetModel.js");

// Index route
budget.get("/", (req, res, next) => {
  try {
    if (budgetArray && budgetArray.length > 0) {
      res.status(200).send(budgetArray);
    } else {
      res.status(404).send({ message: "Transactions were not found." });
    }
  } catch (error) {
    next(error);
  }
});

// Show route
budget.get("/:id", (req, res, next) => {
  try {
    const { id } = req.params;
    //const transaction = budgetArray.find((item) => item.id === parseInt(id));
    if (budgetArray[id]) {
      res.status(200).send(budgetArray[id]);
    } else {
      res.status(404).send({ message: "Transaction not found" });
    }
  } catch (error) {
    next(error);
  }
});

// Create route
budget.post("/", (req, res, next) => {
  try {
    const transactionBody = req.body;
    if (transactionBody) {
      budgetArray.push(transactionBody);
      res.status(201).send(budgetArray[budgetArray.length - 1]);
    } else {
      res.status(404).send({ message: "Transaction was not created." });
    }
  } catch (error) {
    next(error);
  }
});

// Update route
budget.put("/:id", (req, res, next) => {
  console.log(req.params);
  try {
    const id = Number(req.params.id); // if you destructure the id you cant convert into number
    console.log(id);
    //let newId = Number(id);
    //budgetArray[id] = req.body;
    if (budgetArray[id]) {
      budgetArray[id] = req.body;
      res.status(201).send(budgetArray);
    } else {
      res.status(404).send({ message: "Transaction was not updated" });
    }
  } catch (error) {
    next(error);
  }
});

// Delete route
budget.delete("/:id", (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!budgetArray) {
      res.status(404).send({ message: "Transaction was not delleted" });
    } else {
      budgetArray.splice(id, 1);
      res.status(200).send(budgetArray);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = budget;
