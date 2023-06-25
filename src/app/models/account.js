const mongoose = require('mongoose')
const Schema = mongoose.Schema


const accountSchema = new Schema({
    username : String,
    password : String,
},{
    collection : 'Accounts'
}) 

const accountModel = mongoose.model('account',accountSchema)

module.exports = accountModel