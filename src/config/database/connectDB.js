const mongoose = require("mongoose");

const dbUrl = `mongodb+srv://anhtoan260497:${process.env.DB_PASSWORD}@mongodbserver.yczihny.mongodb.net/`
const localhostUrl = `mongodb://127.0.0.1:27017/todolist`

const connect = () => {
  mongoose.connect(localhostUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("connect success");
};

module.exports = { connect };
