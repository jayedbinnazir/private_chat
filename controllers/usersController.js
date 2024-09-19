const { Config } = require("../Config");
const PeopleModel = require("../models/People");
const bcrypt = require("bcrypt");
const fs = require("node:fs");
const path = require("node:path");

const usersController = async (req, res, next) => {
  try {
    const users = await PeopleModel.find();
    console.log(users);
    res.render("users", {
      users: users,
    });
  } catch (err) {
    next(err);
  }
};

const addUser = async (req, res, next) => {
  let newUser;
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    if (req.files && req.files.length > 0) {
      newUser = new PeopleModel({
        ...req.body,
        avatar: req.files[0].filename,
        password: hashedPassword,
      });
    } else {
      newUser = new PeopleModel({
        ...req.body,
        password: hashedPassword,
      });
    }

    const result = await newUser.save();

    res.status(201).json({
      message: "user was added successfully",
    });
  } catch (err) {
    res.status(500).json({
      errors: {
        common: {
          msg: err.message,
        },
      },
    });
  }
};

// remove user
async function removeUser(req, res, next) {
  console.log("params", req.params);
  try {
    const user = await PeopleModel.findByIdAndDelete(req.params.id);

    // remove user avatar if any
    if (user.avatar) {
      fs.unlink(
        path.join(__dirname, `/../public/uploads/avatars/${user.avatar}`),
        (err) => {
          if (err) {
            console.log(`${err.message}`);
          } else {
            console.log(`avatar deleted successfully`);
          }
        }
      );
    }

    res.status(200).json({
      message: "User was removed successfully!",
    });
  } catch (err) {
    res.status(500).json({
      errors: {
        common: {
          msg: "Could not delete the user!",
        },
      },
    });
  }
}

module.exports = {
  usersController,
  addUser,
  removeUser,
};
