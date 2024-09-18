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

const decorateHtml = require("./middlewares/common/decorateHtml.js");

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
app.use("/", decorateHtml("Login"), loginRouter);
app.use("/users", decorateHtml("Users"), usersRouter);
app.use("/inbox", decorateHtml("Inbox"), inboxRouter);

//404
app.use(notFoundError);
//global error
app.use(globalErrorHandler);

module.exports = app;
