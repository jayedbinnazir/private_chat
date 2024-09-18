const express = require("express");
const { inboxController } = require("../controllers/inboxController");

const router = express.Router();

router.get("/", inboxController);

module.exports = router;
