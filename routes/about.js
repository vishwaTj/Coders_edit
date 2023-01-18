const express=require('express');
const router=express.Router();
// to check Authentication
const passport = require('passport');

const aboutController = require('../controllers/about_controller');
router.get('/',aboutController.about_page);

module.exports=router;