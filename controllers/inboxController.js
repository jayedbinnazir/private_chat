const { Config } = require("../Config");

const inboxController = (req, res, next) => {
  res.render("Inbox");
};

module.exports = {
  inboxController,
};
