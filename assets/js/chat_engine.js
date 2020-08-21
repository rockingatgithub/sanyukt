class ChatEngine {
    constructor(chatBoxId, userEmail) {
        this.chatBox = $(`#${chatBoxId}`)
        this.userEmail = userEmail

        this.socket = io.connect('http://localhost:5000')

        if (this.userEmail) {
            this.connectionHandler()
        }
    }

    connectionHandler() {
        let self = this

        this.socket.on('connect', function () {
            console.log('connection established using sockets....')

            self.socket.emit('join_room', {
                user_email: self.userEmail,
                chatroom: 'sanyukt',
            })

            self.socket.on('user_joined', function (data) {
                console.log('a user joined', data)
            })

            //function to emit a message on button click....
            $('#send-message').click(function (e) {
                e.preventDefault()

                let msg = $('#chat-message-input').val()
                if (msg != '') {
                    // console.log('clicked',msg);
                    self.socket.emit('send_message', {
                        message: msg,
                        user_email: self.userEmail,
                        chatroom: 'sanyukt',
                    })
                }
            })

            self.socket.on('receive_message', function (data) {
                console.log('message received', data.message)

                let newMessage = $('<li>')

                let messageType = 'other-message'

                if (data.user_email === self.userEmail) {
                    messageType = 'self-message'
                }

                newMessage.append(
                    $('<span>', {
                        html: data.message,
                    })
                )

                newMessage.append(
                    $('<sub>', {
                        html: data.user_email,
                    })
                )

                newMessage.addClass('list-group-item')
                newMessage.addClass(messageType)

                $('#chat-messages-list').append(newMessage)

                let box = document.getElementById('chat-messages-list')
                let chat_input = document.getElementById('chat-message-input')
                box.scrollTop = box.scrollHeight
                chat_input.value = ''
                // chat_input.focus();
            })
        })
    }
}
