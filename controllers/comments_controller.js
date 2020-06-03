const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req, res){
    Post.findById(req.body.post, function(err, post){
        if(post){
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }, function(er, comment){
                if(err){
                    console.log("can't post comment");
                    return res.redirect('back');
                }
                post.comments.push(comment);
                post.save();
                res.redirect('/');
            })
        }
    })
}