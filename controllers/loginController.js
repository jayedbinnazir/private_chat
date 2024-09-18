const { Config } = require("../Config");

const loginController = (req, res, next) => {
  res.render("index");
};

module.exports = {
  loginController,
};
