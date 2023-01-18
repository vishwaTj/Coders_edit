//requiring libraries
const passport = require('passport');
const user = require('../models/user');

const LocalStrategy = require('passport-local').Strategy;

// requiring the schema to use it for authentication
const User = require('../models/user');

// requiring user 
// authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email', // the field from schema defined
    passReqToCallback:true
     },
     function(req,email,password,done){ //here "done" is an inbuilt function to passport
        // find a user and establish identity
        User.findOne({email:email},function(err,user ){
             if(err){
                req.flash('error',err);
                return done(err);
             }

             if(!user || user.password != password){
                req.flash('error','Invalid Username/Password');
                console.log('Invalid Username/Password');
                return done(null,false);
             }
             
              return done(null,user);
        });
     }
     
));


//seriliser user function (just like setting cookie) to decide which key to be kept in cookie
passport.serializeUser(function(user,done){
    done(null,user.id); // this is storing user id in encrypted format into the cookie
})

//deserialiser user function (just like removing the cookie) 
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('Error in finding user --> Passport');
            return done(err);
         }
         return done(null,user);
    });
});

// check if the user is authenticated
  passport.checkAuthentication = function(req,res,next){
    // if the user is signed in, then  pass on the on the request to the next
    // function controllers action
    if(req.isAuthenticated()){
        return next();
    }
    // if the user is not signed in
       return res.redirect('/users/sign-in');
  }


  passport .setAuthenticatedUser = function(req,res,next){
      if(req.isAuthenticated()){
        // req.user contains the current signed i user from the session cookie and 
        // we are just assigning this to the locals for the views
        res.locals.user = req.user;
      }
      next();
  }

module.exports=passport;

