import User from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = (req, res, next) => {
  User.find({
    $or: [{ email: req.body.userid }, { user_id: req.body.userid }],
  }).then((user) => {
    if (user.length === 1) {
      bcrypt.compare(req.body.password, user[0].password).then((result) => {
        if (result) {
          let token = jwt.sign(
            { email: user[0].email, userId: user[0]._id },
            "secret"
          );
          res.status(200).json({
            message: "Auth Successfull",
            _Id: user[0]._id,
            userEmailL: user[0].email,
            user_ID: user[0].user_id,
            friends: user[0].friends,
            token: token,
          });
        } else {
          res.status(404).json({
            message: "Auth Failed.",
          });
        }
      });
    } else {
      res.status(404).json({
        message: "Email not found.",
      });
    }
  });
};

export const register = (req, res, next) => {
  User.find({ email: req.body.email, user_id: req.body.user_id }).then(
    (user) => {
      if (user.length >= 1) {
        res.status(409).json({ message: "User already exits." });
      } else {
        bcrypt
          .hash(req.body.password, 10)
          .then((hash) => {
            user = new User({
              name: req.body.name,
              user_id: req.body.user_id,
              email: req.body.email,
              password: hash,
            });
            user.save().then(() => {
              res
                .status(201)
                .json({ message: "User was successfully created." });
            });
          })
          .catch(() => {
            res.status(409).json({ message: "Error while creating record." });
          });
      }
    }
  );
};

export const getAllUser = (req, res, next) => {
  User.find({})
    .then((users) => {
      users = users.filter((user) => user._id != req.body.userid);
      res.status(200).json({ users: users });
    })
    .catch((err) => {
      res.status(400).json({ err: err });
    });
};

export const getUserById = (req, res, next) => {
  User.find({ user_id: req.body.user_id })
    .then((user) => {
      res.status(200).json({ name: user[0].name, id: user[0]._id });
    })
    .catch((err) => {
      res.status(400).json({ err: err });
    });
};

export const updateUserById = (req, res, next) => {
  User.findOneAndUpdate(req.params.id, req.body)
    .then((user) => {
      res.status(200).json({ user: user });
    })
    .catch((err) => {
      res.status(404).json({ message: "There was error updating." });
    });
};

export const deleteUserById = (req, res, next) => {
  User.findOneAndRemove({ _id: req.params.id })
    .then((user) => {
      res.status(200).json({ user: user });
    })
    .catch((err) => {
      res.status(404).json({ message: "There was error deleting." });
    });
};
