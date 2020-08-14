const Like = require('../models/like');
const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.toggleLike = async function(req, res){
    try{
        //likes/toggle/?id=abcdef&type=Post......
        let likeable;
        let deleted = false;
        if(req.query.type == 'Post'){
            likeable = await Post.findById(req.query.id).populate('likes');
        }else{
            likeable = await Comment.findById(req.query.id).populate('likes');
        }

        //check if like already exits....
        let existingLike = await Like.findOne({
            likeType: req.query.reaction,
            likeable: req.query.id,
            onModel: req.query.type,
            user: req.user._id
        });
        if(existingLike){
            likeable.likes.pull(existingLike._id);
            likeable.save();

            existingLike.remove();
            deleted = true;
            if(req.query.type === 'Post'){
                let getEntity = await Post.findById(req.query.id);
                let pval = await getEntity.userReactionMap.get(`${req.query.reaction}`);
                await getEntity.userReactionMap.set(`${req.query.reaction}`, pval-1);
                getEntity.save();
            }
            else{
                let getEntity = await Comment.findById(req.query.id);
                let pval = await getEntity.userReactionMap.get(`${req.query.reaction}`);
                await getEntity.userReactionMap.set(`${req.query.reaction}`, pval-1);
                getEntity.save();
            }
            
        }
        else{
            //else create a new like......
            let newLike = await Like.create({
                likeType: req.query.reaction,
                user: req.user._id,
                likeable: req.query.id,
                onModel: req.query.type
            });

            likeable.likes.push(newLike._id);
            likeable.save();

            //add like reaction to post or comment......
            if(req.query.type === 'Post'){
                let getEntity = await Post.findById(req.query.id);
                let pval = await getEntity.userReactionMap.get(`${req.query.reaction}`);
                await getEntity.userReactionMap.set(`${req.query.reaction}`, pval+1);
                getEntity.save();
            }
            else{
                let getEntity = await Comment.findById(req.query.id);
                let pval = await getEntity.userReactionMap.get(`${req.query.reaction}`);
                await getEntity.userReactionMap.set(`${req.query.reaction}`, pval+1);
                getEntity.save();
            }
        }

        // return res.redirect('back');

        return res.status(200).json({
            message: 'Request successfull!',
            data: {
                deleted: deleted,
                likeType: req.query.reaction,
            }
        });
    }
    catch(err){
        console.log(err);
        // return res.redirect('back');
        return res.status(401).json({
            message:"Internal Server Error"
        })
    }
}