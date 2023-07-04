const express = require("express");
const app = express();
const connectDB = require("./config/database/connectDB");
const routes = require("./routes");
const cookies =  require('cookie-parser');


// db connect
connectDB.connect();

//env dotENV
require("dotenv").config();

//port
const port = 8080;

//CORS Enable
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-type");
  next();
});



// use
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookies())


// routes
routes(app);

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(port, console.log(""));
