const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    }
)

const Chat = mongoose.model('Chat', chatSchema)

module.exports = Chat
