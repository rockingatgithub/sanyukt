class FriendRequest {
    constructor(request) {
        this.request = request
        this.createRequest()
    }

    createRequest() {
        let rSelf = this
        $(this.request).click(function (e) {
            e.preventDefault()
            let self = this
            $.ajax({
                type: 'get',
                url: $(self).attr('href'),
                success: function (data) {
                    let newRequest = rSelf.newRequestDom(data.friend)
                    $(`#sent-requests-list`).prepend(newRequest)
                    $('.cancel-request').each(function () {
                        let self = this
                        let friendRequest = new CancelRequest(self)
                    })
                    new Noty({
                        theme: 'relax',
                        text: 'Request Sent!',
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500,
                    }).show()
                    return
                },
                error: function (errData) {
                    new Noty({
                        theme: 'relax',
                        text: 'Request Already Sent!',
                        type: 'alert',
                        layout: 'topRight',
                        timeout: 1500,
                    }).show()
                    console.log('error in completing the request', errData)
                    return
                },
            })
        })
    }

    newRequestDom(friend) {
        return $(`<li class="list-group-item list-item-flex"><div id="friend-sentRequest-${friend._id}">
                    <a href="/users/profile/${friend._id}" class="friend-names">
                    ${friend.name}
                    </a>
                    <a href="/users/friends/cancel/${friend._id}" class="cancel-request btn btn-primary btn-sm">Cancel</a>
                    <br/>
                    </div></li>`)
    }
}

class AcceptRequest {
    constructor(request) {
        this.request = request
        this.createRequest()
    }

    createRequest() {
        let rSelf = this
        $(this.request).click(function (e) {
            e.preventDefault()
            let self = this
            $.ajax({
                type: 'get',
                url: $(self).attr('href'),
                success: function (data) {
                    let newFriend = rSelf.newRequestDom(data.friend)
                    $(`#current-friends-list`).prepend(newFriend)
                    $(`#friend-recRequest-${data.friend._id}`).remove()
                    $('.remove-sent-request').each(function () {
                        let self = this
                        let friendRequest = new RemoveSentRequest(self)
                    })
                    new Noty({
                        theme: 'relax',
                        text: 'Request Accepted!',
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500,
                    }).show()
                    return
                },
                error: function (errData) {
                    console.log('error in completing the request', errData)
                    return
                },
            })
        })
    }

    newRequestDom(friend) {
        return $(`<li class="list-group-item list-item-flex"><div id="friend-box-${friend._id}">
                    <a href="/users/profile/${friend._id}" class="friend-names">
                    ${friend.name}
                    </a>
                    <a href="/users/friends/remove/${friend._id}" class="remove-sent-request btn btn-primary btn-sm">Remove</a>
                <br/>
                </div></li>`)
    }
}

class RejectRequest {
    constructor(request) {
        this.request = request
        this.createRequest()
    }

    createRequest() {
        $(this.request).click(function (e) {
            e.preventDefault()
            let rSelf = this
            $.ajax({
                type: 'get',
                url: $(rSelf).attr('href'),
            })
                .done(function (data) {
                    $(`#friend-recRequest-${data.friend._id}`).remove()
                    new Noty({
                        theme: 'relax',
                        text: 'Request Cancelled!',
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500,
                    }).show()
                    return
                })
                .fail(function (errData) {
                    console.log('error in completing the request', errData)
                    return
                })
        })
    }
}

class CancelRequest {
    constructor(request) {
        this.request = request
        this.createRequest()
    }

    createRequest() {
        $(this.request).click(function (e) {
            e.preventDefault()
            let rSelf = this
            $.ajax({
                type: 'get',
                url: $(rSelf).attr('href'),
            })
                .done(function (data) {
                    $(`#friend-sentRequest-${data.friend._id}`).remove()
                    new Noty({
                        theme: 'relax',
                        text: 'Request Cancelled!',
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500,
                    }).show()
                    return
                })
                .fail(function (errData) {
                    console.log('error in completing the request', errData)
                    return
                })
        })
    }
}

class RemoveSentRequest {
    constructor(request) {
        this.request = request
        this.createRequest()
    }

    createRequest() {
        $(this.request).click(function (e) {
            e.preventDefault()
            let rSelf = this
            $.ajax({
                type: 'get',
                url: $(rSelf).attr('href'),
            })
                .done(function (data) {
                    $(`#friend-box-${data.friend._id}`).remove()
                    new Noty({
                        theme: 'relax',
                        text: 'Friend Removed!',
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500,
                    }).show()
                    return
                })
                .fail(function (errData) {
                    console.log('error in completing the request', errData)
                    return
                })
        })
    }
}
