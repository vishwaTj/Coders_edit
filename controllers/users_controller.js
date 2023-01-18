// const user = require('../models/user');
const User = require('../models/user');
const fs = require('fs');
const path = require('path'); 

module.exports.profile = function(req,res){
   User.findById(req.params.id, function(err, user){
      return res.render('user_profile',{
         title:"Profile page pe aagye",
         profile_user:user
      });
   });
}

module.exports.profile_friend = function(req,res){
   User.findById(req.params.id, function(err, user){
      return res.render('friend_profile',{
         title:"Profile page pe aagye",
         profile_user:user
      });
   });
}


// Update function for user
module.exports.update = async function(req,res){
   if(req.user.id == req.params.id){
      
      try{
         console.log(req.body.avatar);
        let user = await User.findById(req.params.id);
        console.log(user.name);
        User.uploadedAvatar(req,res,function(err){
          if(err){console.log('*****Multer Error: ',err)}
          console.log(req.file);
          user.name = req.body.name;
          user.email = req.body.email;

          if(req.file){
               if(user.avatar){
                  fs.unlinkSync(path.join(__directory,'..',user.avatar)); // unlinkSync is the delete function
               }
    
            // this is saving the path of the uploaded file into the avatar field in the user
            user.avatar = User.avatarPath + '/' + req.file.filename;
          }
          user.save();
          return res.redirect('back');
        });

      }catch(err){
         req.flash('error',err);
         return res.redirect('back'); 
      }


   }else{
      req.flash('error','Unauthorized!');
      return res.status(401).send('Unauthorized');
   }
}


//render sign up page
module.exports.signUp = function(req,res){
   if(req.isAuthenticated()){
      return res.redirect('/users/profile');
   }

   return res.render('user_sign_up.ejs',{
      title:"Codeial | Sign Up"
   });
};

// render sign in page
module.exports.signIn = function(req,res){
   if(req.isAuthenticated()){
      return res.redirect('/users/profile');
   }
   
   return res.render('user_sign_in.ejs',{
      title:'Codeial | Sign In'
   });
};

// get the sign up data
module.exports.create = function(req,res){

   if(req.body.password != req.body.confirm_password){
      req.flash('error', 'Passwords do not match');
      return res.redirect('back');
   }
   
   User.findOne({email:req.body.email},function(err,user){
      if(err){console.log('error in finding user in signing up');return}

      if(!user){
         User.create(req.body,function(error,user){
            if(err){console.log('error in createing user while signing up'); return}
            return res.redirect('/users/sign-in')
         })
      }else{
         req.flash('success', 'You have signed up, login to continue!');
         return res.redirect('back');
      }
   })
}

// sign in and create a session for the user
module.exports.createSession = function(req,res){
   req.flash('success',"Logged in Successfully");
   console.log(req.user.id);
   let uid = req.user.id;
   return res.redirect(`/${uid}`);
}

module.exports.destroySession = function(req,res){
   
   // req.logout();   
   req.logout(function(err){
      if(err){
          return;
      }
   });
   req.flash('success',"Logged out Successfully"); // This should be sent as a response so we make a middleware   
   return res.redirect('/');
}