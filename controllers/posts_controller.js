const Post = require('../models/post');
const Comment = require('../models/comment');
const Like = require('../models/like');

module.exports.create = async function(req, res){
    try{
       
        if(req.params.type === 'text'){
            let post = await Post.create({
                content: req.body.content,
                user: req.user._id,
                postType: req.params.type,
            });

            if(req.xhr){

                post = await post.populate('user', 'name').execPopulate();

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
        else
        {
            // console.log('executed', req.body);
            let post = await Post.create({
                content: 'media',
                user: req.user._id,
                postType: req.params.type,
            });

            Post.uploadedMedia(req, res, function(err){
                if(err){
                    console.log('*****Multer Error', err);
                }

                // post.content = req.body.content;

                if(req.file){
                    
                    //this is saving the path of the uploaded file into the media field in the post...
                    post.imageVideo = Post.mediaPath + '/' + req.file.filename;
                    console.log(Post.mediaPath + " "+ post.imageVideo + " " + req.file.filename);
                }
                post.save();
                return res.redirect('back');
            });
        }
    }
    catch(err){
        console.log('Error', err);
        return res.redirect('back');
    }
}

//module to delete a post....
module.exports.destroy = async function(req, res){
    try{
    let post= await Post.findById(req.params.id)
    //.id is to get id as string......
    if(post.user == req.user.id){

        //delete the associated likes for post , it's likes and comments and it's likes....
        await Like.deleteMany({likeable: post, onModel: 'Post'});
        await Like.deleteMany({likeable: {$in: post.comments}});
        // await Like.deleteMany({ likeable: $isDeleted(true) });
        post.remove();

        let comment=await Comment.deleteMany({
            post: req.params.id
        });

        // console.log(comment);

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
        req.flash('error', 'You cannot delete this post!');
        return res.redirect('back');
    }
    }
    catch(err){
        req.flash('error',err);
        return res.redirect('back');
    }
}