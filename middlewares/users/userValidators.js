const createError = require("http-errors");
const { check, validationResult } = require("express-validator");
const PeopleModel = require("../../models/People");
const fs = require("node:fs");
const path = require("node:path");

const addValidators = [
  check("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isAlpha("en-US", { ignore: " " })
    .withMessage("Name must contain only letters and spaces"),

  check("email")
    .trim()
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail()
    .custom(async (value) => {
      try {
        const user = await PeopleModel.findOne({ email: value });
        if (user) {
          throw createError("Email already in use");
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),

  check("mobile")
    .trim()
    .matches(/^01[3-9]\d{8}$/)
    .withMessage("Mobile number must be a valid Bangladeshi number")
    .custom(async (value) => {
      try {
        const user = await PeopleModel.findOne({ mobile: value });
        if (user) {
          throw createError("Mobile Number already in use");
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),

  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

const addUserValidationHandler = (req, res, next) => {
  const result = validationResult(req);
  console.log(result.mapped());
  if (result.isEmpty()) {
    next();
  } else {
    // Remove uploaded file in case of validation error
    if (req.files.length > 0) {
      fs.unlink(req.files[0].path, (err) => {
        if (err) {
          console.error(`Error deleting file ${req.files[0].path}:`, err);
        } else {
          console.log(`File ${req.files[0].path} deleted successfully`);
        }
      });
    }
    res.status(422).json({ errors: result.mapped() });
  }
};

module.exports = {
  addValidators,
  addUserValidationHandler,
};
