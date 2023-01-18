const passport = require('passport');
const env = require('./environment');


const JWTStrategy = require('passport-jwt').Strategy;

// to extract encrypted value from header of token
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/user');

let opts = {
    // has list of all authors in which each has a bearer key
    jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken(), 
    secretOrKey : env.jwt_secret // this is the ecryption that is happening to key

}

passport.use(new JWTStrategy(opts,function(jwtPayLoad,done){

    User.findById(jwtPayLoad._id, function(err,user){
        if(err){console.log('Error in fnding user from JWT'); return;}
        if(user){
            return done(null,user);
        }else{
            return done(null,false);
        }
    });
}));

module.exports = passport;
