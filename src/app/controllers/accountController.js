const accountModel = require("../models/account");
const jwt = require("jsonwebtoken");

class AccountController {
  getAll(req, res) {
    accountModel
      .find({})
      .then((data) => res.json(data))
      .catch((err) => res.status(500).json("Lỗi server"));
  }

  getOne(req, res) {
    const id = req.params.id;
    accountModel
      .findOne({
        _id: id,
      })
      .then((data) => res.json(data))
      .catch((err) => res.status(500).json("Lỗi server"));
  }

  create(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    accountModel
      .findOne({
        username,
      })
      .then((data) => {
        if (data) {
          res.status(500).json("user da ton tai");
          return;
        }
        return accountModel
          .create({
            username,
            password,
          })
          .then((data) => res.json("tao tai khoan thanh cong"));
      })
      .catch((err) => res.status(500).json("tao tai khoan that bai"));
    //   .then((data) => res.json("tao tai khoan thanh cong"))
    //   .catch((err) => res.status(500).json("tao tai khoan that bai"))
  }

  login(req, res) {
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
      .then((date) => res.json("Xoá thành công"))
      .catch((err) => res.status(500).json("Lỗi server"));
  }

  loggedIn(req, res, next) {
    const token = req.body.token;
    try {
      const i = jwt.verify(token, process.env.JWT_PASSWORD);
      res.json({
        loggedIn: true,
      });
    } catch (err) {
      res.status(401).json({
        loggedIn: false,
        status: "Unauthorized",
      });
    }
    next()
  }
}

module.exports = new AccountController();
