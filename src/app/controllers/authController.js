const checkJWT = require("../../helper/checkJWT");
const removeBearer = require("../../helper/removeBearer");
const accountModel = require("../models/account");
const taskModel = require("../models/task");
const jwt = require("jsonwebtoken");

class AuthController {
  getAll(req, res) {
    accountModel
      .find({})
      .then((data) => res.json(data))
      .catch((err) =>
        res.status(500).json({
          status: 500,
          message: "Server Error",
        })
      );
  }

  getOne(req, res) {
    const id = req.params.id;
    accountModel
      .findOne({
        _id: id,
      })
      .then((data) => res.json(data))
      .catch((err) =>
        res.status(500).json({
          status: 500,
          message: "Server Error",
        })
      );
  }

  create(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    accountModel
      .findOne({
        email,
      })
      .then((data) => {
        if (data) {
          res.status(500).json({
            status: 500,
            message: "Existing account. Please choose another",
          });
          return;
        }
        return accountModel
          .create({
            email,
            password,
          })
          .then(() => {
            taskModel
              .create({
                email,
                password,
                projects: [],
              })
              .then(() =>
                res.json({
                  status: 200,
                  message: "Create new account success",
                })
              )
              .catch((err) =>
                res.status(500).json({
                  status: 500,
                  message: "Failed. Please try again later",
                })
              );
          });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          status: 500,
          message: "Failed. Please try again later",
        });
      });
  }

  login(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    accountModel
      .findOne({
        email,
        password,
      })
      .then((data) => {
        if (data) {
          const _id = { _id: email };
          const token = jwt.sign(_id, process.env.JWT_PASSWORD, {
            expiresIn: 900,
          });
          console.log(token);
          res.json({
            token,
            loggedIn: true,
          });
          return;
        }
        res.status(400).json({
          loggedIn: false,
          status: "Wrong username or password",
        });
        return;
      })
      .catch((err) => {
        res.status(500).json({
          loggedIn: false,
          status: "Server errror",
        });
      });
  }

  update(req, res) {
    const id = req.params.id;
    const newPassword = req.body.password;
    accountModel
      .findByIdAndUpdate(id, { password: newPassword })
      .then((data) => {
        res.json("Update thành công");
      })
      .catch((err) => {
        res.status(500).json("Lỗi");
      });
  }

  delete(req, res) {
    const id = req.params.id;
    accountModel
      .deleteOne({
        _id: id,
      })
      .then((date) =>
        res.json({
          status: 200,
          message: "Success",
        })
      )
      .catch((err) =>
        res.status(500).json({
          status: 500,
          message: "Server Error",
        })
      );
  }

  loggedIn(req, res, next) {
    const bearerToken = req.header("authorization");
    if (!bearerToken) return res.status(401).json({ loggedIn: false });
    const token = removeBearer(bearerToken);
    const user = checkJWT(token);
    if (user) {
      const token = jwt.sign({ _id: user._id }, process.env.JWT_PASSWORD, {
        expiresIn: 900,
      });
      return res.json({
        token,
        loggedIn: true,
      });
    }

    res.status(401).json({
      loggedIn: false,
      status: "Unauthorized",
    });

    // try {
    //   const data = jwt.verify(token, process.env.JWT_PASSWORD);
    //   console.log('hi',data)
    //   res.json({
    //     loggedIn: true,
    //   });

    // } catch (err) {
    //   res.status(401).json({
    //     loggedIn: false,
    //     status: "Unauthorized",
    //   });
    // }
    next();
  }
}

module.exports = new AuthController();
