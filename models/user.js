const mongoose = require('mongoose');

const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars');

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    avatar:{ // a variable to save avatar path in schema
        type:String
    },
    friendships: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Friend'
        }
    ]
},{
    timestamps:true
});

// defining the storage of our files stored since we will store the files on the same disk.
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',AVATAR_PATH)); // this gets converted to '../uploads/users/avatars' 
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); // Datenow features register the time and date of file to distinguish b/w similar named files
      cb(null, file.fieldname + '-' + uniqueSuffix);
    }
});

  // static (this key word helps access it everywhere)
userSchema.statics.uploadedAvatar = multer({storage:  storage}).single('avatar'); // single ensures only file is uploaded per user
userSchema.statics.avatarPath = AVATAR_PATH; // making the path publically available  


const User = mongoose.model('User',userSchema);

module.exports = User;