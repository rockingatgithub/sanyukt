const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId
    },
    //this defines of object id of like object....
    likeable: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'onModel'
    },
    //this field is used for defining the type of the liked object since this is a dynamic reference....
    onModel:{
        type: String,
        required: true,
        enum: ['Post', 'Comment']
    } 
},{
    timestamps: true
});

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;