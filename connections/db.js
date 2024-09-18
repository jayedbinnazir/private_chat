const mongoose = require("mongoose");
const { Config } = require("../Config");

async function main() {
  try {
    await mongoose.connect(`${Config.MONGO_URL}`);
    console.log("database connection successfull");
  } catch (err) {
    console.log(err);
  }
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

module.exports = main;
