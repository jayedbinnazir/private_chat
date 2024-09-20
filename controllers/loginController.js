const { Config } = require("../Config");
const PeopleModel = require("../models/People");
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getLoginPageController = (req, res, next) => {
  res.render("index");
};

const loginController = async (req, res, next) => {
  try {
    //user exists or not
    const user = await PeopleModel.findOne({
      $or: [{ email: req.body.username }, { mobile: req.body.username }],
    });

    if (!user) {
      throw createError(404, " user not exists");
    }
    console.log(user);

    //password match
    const isPasswordMatched = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordMatched) {
      throw createError(401, "Password not matched!");
    }

    //after password matched create userObject and generate a token
    const userObject = {
      username: user.name,
      mobile: user.mobile,
      email: user.email,
      role: "user",
    };
    const token = jwt.sign(userObject, Config.JWT_SECRET, {
      expiresIn: Config.EXPIRES,
    });

    //set cookie
    res.cookie(Config.COOKIE_NAME, token, {
      maxAge: Config.EXPIRES,
      httpOnly: true,
      signed: true,
    });

    res.locals.loggedInUser = userObject;

    res.render("inbox");
  } catch (err) {
    res.render("index", {
      data: {
        username: req.body.username,
      },
      errors: {
        common: {
          msg: err.message,
        },
      },
    });
  }
};

const logout = (req, res) => {
  res.clearCookie(Config.COOKIE_NAME);
  res.send("Logged Out");
};

module.exports = {
  getLoginPageController,
  loginController,
  logout,
};
