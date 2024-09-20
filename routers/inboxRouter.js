const express = require("express");
const decorateHtml = require("../middlewares/common/decorateHtml");

const { inboxController } = require("../controllers/inboxController");
const { checkLogin } = require("../middlewares/common/authgaurd");

const router = express.Router();

router.get("/", decorateHtml("Inbox"), checkLogin, inboxController);

module.exports = router;
