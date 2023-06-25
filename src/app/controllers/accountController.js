const accountModel = require("../models/account");

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
    const username = req.body.username;
    const password = req.body.password;
    accountModel
      .findOne({
        username,
        password,
      })
      .then((data) => {
        if (data) {
          res.json("Đăng nhập thành công");
          return;
        }
        res.status(400).json("Đăng nhập thất bại");
        return;
      })
      .catch((err) => {
        res.status(500).json("Có lỗi bên Server");
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
}

module.exports = new AccountController();
