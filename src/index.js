const express = require("express");
const app = express();
const connectDB = require("./config/database/connectDB");
const routes = require("./routes");
const cookies =  require('cookie-parser');
// const  cors = require('cors')


// db connect
connectDB.connect();

//env dotENV
require("dotenv").config()

//port
const port = 8080;

//CORS Enable

app.use(function(req, res, next) {
  // res.header("Access-Control-Allow-Origin", "*");
  const allowedOrigins = ['http://localhost:3000', 'https://todoist-ten-ebon.vercel.app', 'https://todoist-ten-ebon.vercel.app'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-credentials", true);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
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
