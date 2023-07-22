const mongoose = require("mongoose");
require('dotenv').config()
const dbUrl = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mongodbserver.yczihny.mongodb.net/todoistBE`
// const localhostUrl = `mongodb://127.0.0.1:27017/todolist`

const connect = async () => {
  await mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("connect success");
};

module.exports = { connect };
