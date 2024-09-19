const express = require("express");
const ejs = require("ejs");
const app = express();
const path = require("node:path");
const cookieParser = require("cookie-parser");
const { Config } = require("./Config");
const {
  notFoundError,
  globalErrorHandler,
} = require("./middlewares/common/errorHandler");

//import routers
const loginRouter = require("./routers/loginRouter");
const inboxRouter = require("./routers/inboxRouter");
const usersRouter = require("./routers/usersRouter");

app.use(cookieParser(Config.COOKIE_SECRET));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

//setup view-engine
app.set("view engine", "ejs");

//router setup
app.use("/", loginRouter);
app.use("/users", usersRouter);
app.use("/inbox", inboxRouter);

//404
app.use(notFoundError);
//global error
app.use(globalErrorHandler);

module.exports = app;
