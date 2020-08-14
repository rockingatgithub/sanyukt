const Chat = require('../models/chat')
const User = require('../models/user')

module.exports.create = async function (req, res) {
    try {
        let newChat = await Chat.create({
            content: req.body.chat_content,
            user: req.user._id,
        })

        let chat = await newChat.populate('content', 'user').execPopulate()

        return res.json(200, {
            message: 'message sent',
            data: {
                chat: chat,
            },
        })
    } catch (err) {
        return res.json(401, {
            message: 'Internal Server Error',
        })
    }
}
