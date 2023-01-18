const express=require('express');
const router=express.Router();

const friendsController = require('../controllers/posts_controller');

// router.post('/create',postController.create);

router.post('/friends',friendsController.addfriend);
// router.get('/destroy/:id',passport.checkAuthentication,postController.destroy); // here we are sending in variable id
