const dotenv = require("dotenv");

dotenv.config();

const { PORT, MONGO_URL, COOKIE_SECRET, NODE_ENV, APP_NAME } = process.env;

module.exports.Config = {
  PORT,
  MONGO_URL,
  COOKIE_SECRET,
  NODE_ENV,
  APP_NAME,
};
