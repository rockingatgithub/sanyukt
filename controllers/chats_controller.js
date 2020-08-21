const Chat = require('../models/chat')
const User = require('../models/user')

module.exports.create = async function (req, res) {
    try {
        // console.log(req.body.chat_content + ' ' + req.user._id)
        // console.log(req.body)
        let newChat = await Chat.create({
            content: req.body.chat_content,
            user: req.user._id,
        })

        let chat = await newChat.populate('user', 'name email').execPopulate()

        // console.log(chat)

        return res.status(200).json({
            message: 'message sent',
            data: {
                chat: chat,
            },
        })
    } catch (err) {
        console.log(err)
        return res.status(200).json({
            message: 'Internal Server Error',
        })
    }
}
