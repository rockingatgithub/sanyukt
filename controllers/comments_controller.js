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

//deleting a comment....
module.exports.destroy = function(req, res){
    Comment.findById(req.params.id, function(err, comment){
        // let postId = comment.post;
        // var userId;
        // Post.findById(postId, function(err, post){
        //     userId = post.user;    //just accessing the first field of user key that is id...
        // })
        if(comment.user == req.user.id){
            
            let postId = comment.post;  //saving the post id in order to remove from array stored in post...

            comment.remove();

            Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}}, function(err, post){
                return res.redirect('back');
            })

        }
        else{
            return res.redirect('back');
        }
    })
}