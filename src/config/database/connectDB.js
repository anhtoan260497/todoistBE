const mongoose = require("mongoose");
const dbUrl = `mongodb+srv://anhtoan260497:Elfenlied1997@mongodbserver.yczihny.mongodb.net/todoistBE`
const localhostUrl = `mongodb://127.0.0.1:27017/todolist`

const connect = async () => {
  await mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("connect success");
};

module.exports = { connect };
