const express=require('express');

const router=express.Router();

const homeController = require('../controllers/home_controller');

console.log('Router connected');

router.get('/',homeController.home_one);
router.get('/:id',homeController.home);
router.use('/users',require('./users'));
router.use('/posts', require('./posts'));
router.use('/comments',require('./comments'));
router.use('/likes',require('./likes'));


router.use('/api',require('./api'));
router.use('/about',function(req,res){return res.render('_about')});
router.use('/Privacy',function(req,res){return res.render('_privacy')});
router.use('/copyright',function(req,res){return res.render('_copyright')});

module.exports=router;