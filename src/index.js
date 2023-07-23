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

app.use(cors())



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
