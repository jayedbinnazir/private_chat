const express = require("express");
const decorateHtml = require("../middlewares/common/decorateHtml");

const { inboxController } = require("../controllers/inboxController");

const router = express.Router();

router.get("/", decorateHtml("Inbox"), inboxController);

module.exports = router;
