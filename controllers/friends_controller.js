// const Like = require("../models/like");
const Post =  require("../models/post");
const Comment = require('../models/comment');
const USER = require('../models/user');
const Friend = require('../models/friendship');
const { findById } = require("../models/user");

module.exports.addFriend = async function(req, res){
    try{

        let user1 = await USER.findById(req.user.id);

        let user2 = await USER.findById(req.params.id);

        let friends = await Friend.create({
                from_user:user1,
                to_user:user2
        });
        user1.friendships.push(user2.id);
        user2.friendships.push(user1.id);
        user1.save();
        user2.save();
        console.log(user1.friendships);
        let flag=false;
        for(x of user1.friendships){
            let str = String(x._id);
            let id_var = str.slice(0,41);
           if(id_var==user2.id){ 
            flag = true;
            }
        }
        let uid = user1.id;
        res.redirect(`/${uid}`);
        // `/${uid}`

    }catch(err){
        console.log(err);
        return res.json(500, {
            message: 'Internal Server Error'
        });
    }
}
module.exports.removeFriend = async function(req, res){
    try{

        let user1 = await USER.findById(req.user.id);
        let user2 = await USER.findById(req.params.id);
        let flag=false;
        user1.friendships.pull(user2.id);
        user2.friendships.pull(user1.id);
        user1.save();
        user2.save();
        let uid = user1.id;
        console.log(user1.friendships);
        res.redirect(`/${uid}`);
        // `/${uid}`

    }catch(err){
        console.log(err);
        return res.json(500, {
            message: 'Internal Server Error'
        });
    }
}