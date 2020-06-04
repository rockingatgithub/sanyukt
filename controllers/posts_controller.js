const Post = require('../models/post');
const Comment = require('../models/comment');
module.exports.create = async function(req, res){
    try{
    let post = await Post.create({
        content: req.body.content,
        user: req.user._id
    });

    if(req.xhr){
        return res.status(200).json({
            data: {
                post: post
            },
            message: "Post created!"
        });
    }

    req.flash('success','Post created');
    return res.redirect('back');
    }
    catch(err){
        console.log('Error', err);
        return;
    }
}

//module to delete a post....
module.exports.destroy = async function(req, res){
    try{
    let post= await Post.findById(req.params.id)
    //.id is to get id as string......
    if(post.user == req.user.id){
        post.remove();

        let comment=await Comment.deleteMany({
            post: req.params.id
        });

        if(req.xhr){
            return res.status(200).json({
                data: {
                    post_id: req.params.id
                },
                message: "Post deleted"
            });
        }

        req.flash('success','Post deleted successfully');
        return res.redirect('back');
    }
    else{
        return res.redirect('back');
    }
    }
    catch(err){
        req.flash('error',err);
        return res.redirect('back');
    }
}