const Post = require('../models/post');
const User = require('../models/user');
const Chat = require('../models/chat');


module.exports.home = async function(req, res){
     
    try{
        //populate the user of each post...
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            },
            populate:{
                path: 'likes'
            }
        }).populate('likes');

        let chats = await Chat.find({})
        .populate('user');
        
        let users = await User.find({});
        return res.render('home', {
            title: 'Sanyukt | Home',
            posts: posts,
            all_users: users,
            chats: chats
        });
        }
    catch(err){
        console.log('Error', err);
        return;
    }
}