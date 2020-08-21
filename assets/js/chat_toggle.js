{
    let showChatBox = function () {
        // console.log('chat button clicked')
        let swt = document.getElementById('chat-box-toggle')
        swt.addEventListener('click', function (e) {
            e.preventDefault()
            console.log('chat button clicked')
            let chatBox = document.getElementById('user-chat-box')
            chatBox.style.display = 'block'
            swt.style.display = 'none'
        })
    }

    let hideChatBox = function () {
        console.log('chat box closed')
        let close = document.getElementById('chat-close')
        close.addEventListener('click', function (e) {
            e.preventDefault()
            let chatBox = document.getElementById('user-chat-box')
            let swt = document.getElementById('chat-box-toggle')
            chatBox.style.display = 'none'
            swt.style.display = 'block'
        })
    }

    showChatBox()
    hideChatBox()
}
