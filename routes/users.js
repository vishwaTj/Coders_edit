const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');
const friendsController = require('../controllers/friends_controller');
//becoz profile func is defined on controller 
router.get('/profile/:id',passport.checkAuthentication,usersController.profile);
router.get('/profile-friend/:id',passport.checkAuthentication,usersController.profile_friend);
router.post('/update/:id',passport.checkAuthentication,usersController.update);
router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);

router.post('/create',usersController.create);
router.post('/profile/:id',friendsController.addFriend);
router.post('/profile-friend/:id',friendsController.removeFriend);


// use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'},
), usersController.createSession);

//logout function
router.get('/sign-out',usersController.destroySession);

router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/sign-in'}), usersController.createSession);



module.exports=router;