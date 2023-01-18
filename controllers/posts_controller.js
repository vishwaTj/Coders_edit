module.exports.blog=function(req,res){
    res.end('<h1> Users Post</h1>');
}// ye mera tha dont confuse

const Post = require('../models/post');
const Comment = require('../models/comment');
const Like = require('../models/like');

module.exports.create = async function(req,res){
    try{
            let post = await Post.create({
            content : req.body.content,
            user: req.user._id
           });

           // here .xhr is an ajax request we detect it and proceed accordingly 
           if(req.xhr){
            // if we want to populate just the name of the user (we'll not want to send the password in the API), this is how we do it!
            post = await post.populate('user', 'name');

            return res.status(200).json({
                data:{
                    post:post
                },
                message: "Post created!"
            });
           }
           
           req.flash('success','Post published');
           return res.redirect('back');

    }catch(err){
        req.flash('error',err);
        console.log('error in creating a post:',err);
         return res.redirect('back');
    }
 }
 

// Using async await and making the code simpler
module.exports.destroy = async function(req,res){
    try{
        let post = await Post.findById(req.params.id);
        //.id means converting the object id into string
        // we need to check if the post being deleted is from that user or not
       if(post.user == req.user.id){

           // CHANGE :: delete the associated likes for the post and all its comments likes too
           await Like.deleteMany({likeable:post,onModel:'Post'});
           await Like.deleteMany({_id: {$in: post.comments}});

           post.remove();
           await Comment.deleteMany({post: req.params.id});

           if(req.xhr){
            return res.status(200).json({
                data:{
                    post_id:req.params.id
                },
                message:"Post deleted successfully"
            });
           }

           req.flash('success', 'Post deleted!');
           return res.redirect('back');
           
       }else{
            req.flash('error','you cannot delete this post');
           return res.redirect('back');
       }
    }
    catch(err){
        req.flash('error',err);
        return res.redirect('back');
    }
    
}