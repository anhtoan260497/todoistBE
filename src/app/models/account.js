const mongoose = require('mongoose')
const Schema = mongoose.Schema


const accountSchema = new Schema({
    email : String,
    password : String,
},{
    collection : 'Accounts',
    timestamps : true
}) 

const accountModel = mongoose.model('account',accountSchema)

module.exports = accountModel