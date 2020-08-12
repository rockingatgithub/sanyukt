const Post = require('../models/post');
const User = require('../models/user');
const Chat = require('../models/chat');
const Friendship = require('../models/friendship');


module.exports.home = async function(req, res){
     
    try{
        //populate the user of each post...
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate:{
                path: 'likes'
            },
            populate: {
                path: 'user'
            }
        }).populate('likes');
        let chats = await Chat.find({})
        .populate('user');
        
        

        let users = await User.find({
        });
        let to_friends = [];
        let from_friends = [];
        let sent_friends = [];
        let received_friends = [];
        if(req.user){

            to_friends = await Friendship.find({
                from_user: req.user._id,
                pending: true,
            }).populate('to_user');
            
            from_friends = await Friendship.find({
                to_user: req.user._id,
                pending: true,
            }).populate('from_user');

            received_friends = await Friendship.find(
                {
                    to_user: req.user._id,
                    pending: false,
                })
            .populate('from_user')
            
            sent_friends = await Friendship.find(
                {
                    from_user: req.user._id,
                    pending: false,
                })
            .populate('to_user')

            // console.log(from_friends);
        }
            return res.render('home', {
            title: 'Sanyukt | Home',
            posts: posts,
            all_users: users,
            sent_friends: sent_friends,
            received_friends: received_friends,
            sent_request: to_friends,
            rec_request: from_friends,
            chats: chats,
        });
        }
    catch(err){
        console.log('Error', err);
        return;
    }
}