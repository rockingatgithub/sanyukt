const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comments_mailer');
const queue = require('../config/kue');
const commentEmailWorker = require('../workers/comment_email_worker');
const Like = require('../models/like');


module.exports.create = async function(req, res){
    try{
    let post = await Post.findById(req.body.post)
        if(post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            post.comments.push(comment);
            post.save();

            comment = await comment.populate('user', 'name email').execPopulate();
            // console.log(comment);
            // commentsMailer.newComment(comments);
            //push sending job mail to kue.....
            //create queue with name emails....
            let job = queue.create('emails', comment).save(function(err){
                if(err)
                {
                    console.log('error in sending job to queue');
                    return;
                }
                console.log('job enqueued', job.id);
            })


            if(req.xhr){
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: 'Post created'
                });
            }


            req.flash('success', 'comment created');
            return res.redirect('/');
        }
    }
    catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }
}

//deleting a comment....
module.exports.destroy = async function(req, res){
    try{
    let comment = await Comment.findById(req.params.id)
    if(comment.user == req.user.id){
            
        let postId = comment.post;  //saving the post id in order to remove from array stored in post...

        comment.remove();

       let post= await Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}});


        await Like.deleteMany({likeable: comment._id, onModel: 'Comment'});

        if (req.xhr){
            return res.status(200).json({
                data: {
                    comment_id: req.params.id
                },
                message: "Post deleted"
            });
        }


       req.flash('success', 'comment deleted successfully');
       return res.redirect('back');
    }
    else{
        req.flash('error', 'Unauthorized');
        return res.redirect('back');
    }
    }
    catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }
}