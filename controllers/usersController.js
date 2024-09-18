const { Config } = require("../Config");

const usersController = (req, res, next) => {
  res.render("users");
};

module.exports = {
  usersController,
};
