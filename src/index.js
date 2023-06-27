const express = require('express')
const app = express()
const connectDB = require('./config/database/connectDB')
const routes = require('./routes')

// db connect
connectDB.connect()

require('dotenv').config()

const port = 8080


// use
app.use(express.json())
app.use(express.urlencoded({
    extended : true
  }))

// routes 
routes(app)



app.get('/',(req,res) => {
    res.send('hello')
})

app.listen(port, console.log(''))

