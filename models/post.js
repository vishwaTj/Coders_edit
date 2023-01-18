const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    content : {
        type:String,
        required:true
    },
    user:{ // the variable to link the post to user
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },

    //include the array of ids of all comments in this post Schema itself
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Comment'
    }],
    likes:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Like'
        }
    ]
},{
    timestamps:true

});

const Post = mongoose.model('Post',postSchema);
module.exports = Post;