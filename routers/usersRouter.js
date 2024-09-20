const express = require("express");
const decorateHtml = require("../middlewares/common/decorateHtml");

const {
  usersController,
  addUser,
  removeUser,
} = require("../controllers/usersController");
const avatarUpload = require("../middlewares/users/avatarUpload");
const {
  addValidators,
  addUserValidationHandler,
} = require("../middlewares/users/userValidators");
const { checkLogin } = require("../middlewares/common/authgaurd");

const router = express.Router();

router.get("/", decorateHtml("Users"), checkLogin, usersController);
router.post(
  "/",
  checkLogin,
  avatarUpload,
  addValidators,
  addUserValidationHandler,
  addUser
);

router.delete("/:id", removeUser);

module.exports = router;
