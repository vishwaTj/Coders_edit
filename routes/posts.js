const express=require('express');
const router=express.Router();
// to check Authentication
const passport = require('passport');

const postController = require('../controllers/posts_controller');

// becoz posts function is defined in the controller
router.get('/blog',postController.blog);

// router.post('/create',postController.create);

router.post('/create',passport.checkAuthentication,postController.create);
router.get('/destroy/:id',passport.checkAuthentication,postController.destroy); // here we are sending in variable id


module.exports=router;