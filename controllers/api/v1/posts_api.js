const Post = require('../../../models/post');
const Comment = require('../../../models/comment');
module.exports.index = async function(req, res){

    let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });

    return res.json(200,{
        message: 'List of posts',
        posts: posts
    })
};


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
        return res.json(200, {
            message: "Post and associated comments deleted"
        })
    }
    else{
        return res.json(401, {
            message: "You can't delte this post"
        })
    }
}
    catch(err){
        return res.json(500, {
            message: "Internal server Error"
        });
    }
};