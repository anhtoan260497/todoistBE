const mongoose = require("mongoose");

const connect = () => {
  mongoose.connect("mongodb://127.0.0.1:27017/todolist", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("connect success");
};

module.exports = { connect };
