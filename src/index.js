const express = require("express");
const app = express();
const connectDB = require("./config/database/connectDB");
const routes = require("./routes");
const cookies =  require('cookie-parser');
const  cors = require('cors')


// db connect
connectDB.connect();

//env dotENV
require('dotenv').config({path: './.env'});

//port
const port = 8080;

//CORS Enable

app.use(cors())

// app.use((req, res, next) => {
//   const allowedOrigins = ['http://127.0.0.1:3000', 'http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:3000'];
//   const origin = req.headers.origin;
//   if (allowedOrigins.includes(origin)) {
//        res.setHeader('Access-Control-Allow-Origin', origin);
//   }
//   //res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8020');
//   res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   res.header('Access-Control-Allow-Credentials', true);
//   return next();
// });



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
