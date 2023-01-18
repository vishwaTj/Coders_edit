const Post = require('../models/post');
const User = require('../models/user');

// using asunc and await to sunchronously function

module.exports.home = async function(req,res){ 
   
   try{
   let posts = await Post.find({})
   .sort('-createdAt')
   .populate('user')
   .populate({
      path:'comments',
      populate : {
         path :'user'
      },
      populate:{
         path:'likes'
      }
   }).populate('likes');

     let user2 = await User.findById(req.params.id);
     console.log(user2.friendships.length+" voot ");
     let users = await User.find({});
     let usr=[];   
     for (u of users){
        for(n of user2.friendships){
           if(n._id == u.id){
             usr.push(u);

             break;
           }
        } 
     }
     console.log(usr);
      return res.render('home',{
      title: "Codeial | Home",
      posts: posts,
      all_users:users,
      friend:usr
    }); 
   }catch(err){
      console.log('Error',err);
   }
}

module.exports.home_one = async function(req,res){ 
   
   try{
       // populate the user of each post
   let posts = await Post.find({})
   .sort('-createdAt')
   .populate('user')
   .populate({
      path:'comments',
      populate : {
         path :'user'
      },
      populate:{
         path:'likes'
      }
   }).populate('likes');
   
     let users = await User.find({});
     let user1 = await User.findById(req.params.id);
      return res.render('home',{
      title: "Codeial | Home",
      posts: posts,
      all_users:users,
      friend:users
    }); 
   }catch(err){
      console.log('Error',err);
   }
}



