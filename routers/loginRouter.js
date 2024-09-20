const express = require("express");
const decorateHtml = require("../middlewares/common/decorateHtml");
const {
  getLoginPageController,
  loginController,
  logout,
} = require("../controllers/loginController");
const {
  addLoginValidators,
  loginValidationHandler,
} = require("../middlewares/login/loginValidators");
const { redirectLoggedIn } = require("../middlewares/common/authgaurd");

const page_title = "Login";

const router = express.Router();

router.get(
  "/",
  decorateHtml(page_title),
  redirectLoggedIn,
  getLoginPageController
);
router.post(
  "/",
  decorateHtml(page_title),
  addLoginValidators,
  loginValidationHandler,
  loginController
);

router.delete("/", logout);

module.exports = router;
