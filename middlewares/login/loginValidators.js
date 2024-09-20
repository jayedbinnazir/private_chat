const createError = require("http-errors");
const { check, validationResult } = require("express-validator");
const PeopleModel = require("../../models/People");
const fs = require("node:fs");
const path = require("node:path");

const addLoginValidators = [
  check("username")
    .isLength({ min: 1 })
    .withMessage("mobile number or email is required"),

  check("password").isLength({ min: 1 }).withMessage("Password is required"),
];

const loginValidationHandler = (req, res, next) => {
  const result = validationResult(req);
  console.log(result.mapped());
  if (result.isEmpty()) {
    next();
  } else {
    res.render("index", {
      data: {
        username: req.body.username,
      },
      errors: result.mapped(),
    });
  }
};

module.exports = {
  addLoginValidators,
  loginValidationHandler,
};
