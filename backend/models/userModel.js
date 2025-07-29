const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username:{
            type: String,
            required : [true,'Please add a username!'],
            unique : true,
        },
        email : {
            type : String,
            required : [true, 'Please add an email!'],
            unique : true,
        },
        password : {
            type: String,
            required : [true, "Please add a Password!"]
        }
    },
    {
        timestamps : true
    })

module.exports = mongoose.model('User',userSchema);