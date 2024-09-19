const express = require("express");
const decorateHtml = require("../middlewares/common/decorateHtml");
const { loginController } = require("../controllers/loginController");

const router = express.Router();

router.get("/", decorateHtml("Login"), loginController);

module.exports = router;
