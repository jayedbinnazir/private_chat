const { Config } = require("../../Config");

const decorateHtml = (page_title) => {
  return (req, res, next) => {
    (res.locals.html = true),
      (res.locals.title = page_title + "-" + `${Config.APP_NAME}`);
    (res.locals.loggedInUser = {}),
      (res.locals.data = {}),
      (res.locals.errors = {});
    next();
  };
};

module.exports = decorateHtml;
