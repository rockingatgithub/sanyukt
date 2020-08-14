const mongoose = require('mongoose');


let newMap = new Map();
newMap.set('like', 0);
newMap.set('haha', 0);
newMap.set('anger', 0);
newMap.set('love', 0);
newMap.set('sad', 0);

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    
    //comment belong to user and posts..
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    likes:[ {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Like'
    }],

    userReactionMap: {
        type: Map,
        of: Number,
        default: newMap,
    },
    
},{
    timestamps: true
});

const  Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;