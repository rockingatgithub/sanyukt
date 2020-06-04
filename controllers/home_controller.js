const Post = require('../models/post');
const User = require('../models/user');
module.exports.home = function(req, res){
    
    // console.log(req.cookies);
    // res.cookie('user_id', 25); 

    //populate the user of each post...
    Post.find({}).populate('user').populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    }).exec(function(err, posts){
        User.find({},function(err, user){
            return res.render('home', {
                title: 'Codeial | Home',
                posts: posts,
                all_users: user
            });
        })
        
    })
}