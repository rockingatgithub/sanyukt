const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const MEDIA_PATH = path.join('/uploads/users/mediaPosts');

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true    //so that it must be saved..
    },

    postType: {
        type: String,
        enum: ['text', 'video', 'image']
    },
    imageVideo: {
        type: String,
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

    userReactionMap: {
        type: Map,
        // default: new Map()
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