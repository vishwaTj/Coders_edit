const mongoose = require('mongoose');

const friendShipSchema = new mongoose.Schema({
    // the user who sent this request
    from_user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    // the user who accepted this request, the naming iss just to understand, otherwise, the users wont see a difference
    to_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
},{
    timestamps:true
});

const Friend = mongoose.model('Friend',friendShipSchema);

module.exports = Friend;