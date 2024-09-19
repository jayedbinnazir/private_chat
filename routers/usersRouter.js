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

const router = express.Router();

router.get("/", decorateHtml("Users"), usersController);
router.post(
  "/",
  avatarUpload,
  addValidators,
  addUserValidationHandler,
  addUser
);

router.delete("/:id", removeUser);

module.exports = router;
