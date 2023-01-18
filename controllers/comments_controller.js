const Comment =require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comments_mailer');
const queue = require('../config/kue');
const commentEmailWorker = require('../workers/comment_email_worker');
const Like = require('../models/like');

module.exports.create = async function(req,res){
    try{
        let post = await Post.findById(req.body.post);
        if(post){
         let comment = await Comment.create({
             content:req.body.content,
             post:req.body.post,
             user:req.user._id
         });
         if(req.xhr){
            comment = await comment.populate('user', 'name');
            //similar for comments to fetch user's id
            return res.status(200).json({
                data:{
                    comment:comment
                },
                message:"Post created!"
            });
         }
         req.flash('success','Comment published');
         post.comments.push(comment);
         post.save()// after giving this it gets saved else it will remain in cache memory
         
         comment = await comment.populate('user','name email');
        //  commentsMailer.newComment(comment);

        // creating a worker queueu like the priority queue which we learned in java
        let job = queue.create('emails',comment).save(function(err){ // after save function the job is added to queue
            if(err){
                console.log('error in sending to the queue',err);
                return;
            }

            console.log('job enqueued',job.id);
        });

         res.redirect('/');
      }
    }
    catch(err){
        console.log(err);
        return;
    }
}

module.exports.destroy = async function(req,res){
    
    try{
        let comment = await Comment.findById(req.params.id);

        if (comment.user == req.user.id){

            let postId = comment.post;

            comment.remove();
            let postArray = Post.findById(postId);          
          

            // populate user 
            let post = Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}});


            // CHANGE :: destroy the associated likes for this comment
            await Like.deleteMany({likeable: comment._id, onModel: 'Comment'});

            
            // send the comment id which was deleted back to the views
            if (req.xhr){
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "Comment deleted"
                });
            }


            req.flash('success', 'Comment deleted!');

            return res.redirect('back');
        }else{
            req.flash('error', 'Unauthorized');
            return res.redirect('back');
        }
    }catch(err){
        req.flash('error', err);
        return;
    }
}