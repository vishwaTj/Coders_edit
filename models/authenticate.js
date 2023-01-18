const mongoose=require('mongoose');

const Userdb = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    password:{
        type:password,
        required:true
    }
})

const Username = mongoose.model('Username',Userdb);

module.exports = Username;