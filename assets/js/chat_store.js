$('#send-message').click(function(e){
    e.preventDefault();
    let chatCreate = $('#chat-form');
    $.ajax({
        type: 'post',
        url: '/chats/create',
        data: chatCreate.serialize(),
        success: function(data){
            console.log(data);
        }
    });
});