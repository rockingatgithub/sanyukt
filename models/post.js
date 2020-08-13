const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const MEDIA_PATH = path.join('/uploads/users/mediaPosts');

let newMap = new Map();
newMap.set('like', 0);
newMap.set('haha', 0);
newMap.set('anger', 0);
newMap.set('love', 0);
newMap.set('sad', 0);

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true    //so that it must be saved..
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    //include the array of ids of all comments in this post schema itself...
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Like'
    }],
    postType: {
        type: String,
        enum: ['text', 'video', 'image']
    },
    imageVideo: {
        type: String,
    },
    userReactionMap: {
        type: Map,
        of: Number,
        default: newMap
    },

},{
    timestamps:true
}
);

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..', MEDIA_PATH));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
})

postSchema.statics.uploadedMedia = multer({storage: storage}).single('imageVideo');
postSchema.statics.mediaPath = MEDIA_PATH;

const Post = mongoose.model('Post', postSchema);
module.exports = Post;