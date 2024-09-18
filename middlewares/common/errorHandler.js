const createError = require("http-errors");
const { Config } = require("../../Config");

const notFoundError = (req, res, next) => {
  next(createError(404, "Your requested content was not found"));
};

const globalErrorHandler = (err, req, res, next) => {
  res.locals.error =
    Config.NODE_ENV === "development" ? err : { message: err.message };

  if (res.locals.html) {
    res.render("error", {
      title: "Error Page",
      msg: res.locals.error,
    });
  } else {
    res.json(res.locals.error);
  }
};

module.exports = {
  notFoundError,
  globalErrorHandler,
};
