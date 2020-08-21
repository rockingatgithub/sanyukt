//fill in ths js for ajax requests.....

//this class will be intialized for every post on page...
//1. when the pages loads
//2. Creation of every post dynamically via ajax...

class PostComments {
    //constructor is used to initilize the instance of the class whenever a new instance is created....
    constructor(postId) {
        this.postId = postId
        this.postContainer = $(`#post-${postId}`)
        this.newCommentForm = $(`#post-${postId}-comments-form`)

        this.createComment(postId)

        let self = this
        //call for all the existing comments...
        $(' .delete-comment-button', this.postContainer).each(function () {
            self.deleteComment($(this))
        })
    }

    createComment(postId) {
        let pSelf = this
        this.newCommentForm.submit(function (e) {
            e.preventDefault()
            let self = this

            $.ajax({
                type: 'post',
                url: '/comments/create',
                data: $(self).serialize(),
                success: function (data) {
                    let newComment = pSelf.newCommentDom(data.data.comment)
                    $(`#post-comments-${postId}`).prepend(newComment)
                    pSelf.deleteComment(
                        $(' .delete-comment-button', newComment)
                    )

                    //enabling functionality of toggle like.....
                    new ToggleLike($(' .toggle-like-button', newComment))
                    new Noty({
                        theme: 'relax',
                        text: 'Comment published!',
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500,
                    }).show()
                },
                error: function (error) {
                    console.log(error.responseText)
                },
            })
        })
    }

    newCommentDom(comment) {
        //show count of zero lkes on this comment....

        return $(`<li id="comment-${comment._id}" class="list-group-item">
                        <p>
                            <small>
                                <a class="delete-comment-button" href="/comments/destroy/${comment._id}"><img src="/images/trash.svg" height="15px" width="15px" /></a>
                            </small>
                            
                            ${comment.content}
                            <br>
                            <small>
                                ${comment.user.name}
                            </small>
                            <small class="likebox">
                                <div class="likeOptions">
                                <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${comment._id}&type=Comment&reaction=like">
                                    <span class="emojis-post">👍</span>
                                </a>
                                <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${comment._id}&type=Comment&reaction=love">
                                    <span class="emojis-post">❤️</span>
                                </a>
                                <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${comment._id}&type=Comment&reaction=haha">
                                    <span class="emojis-post">😆</span>
                                </a>
                                <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${comment._id}&type=Comment&reaction=anger">
                                    <span class="emojis-post">😡</span>
                                </a>
                                <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${comment._id}&type=Comment&reaction=sad">
                                    <span class="emojis-post">☹️</span>
                                </a>
                                </div>
                            </small>
                        </p>

                    </li>`)
    }

    deleteComment(deleteLink) {
        $(deleteLink).click(function (e) {
            e.preventDefault()

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function (data) {
                    $(`#comment-${data.data.comment_id}`).remove()

                    new Noty({
                        theme: 'relax',
                        text: 'Comment Deleted',
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500,
                    }).show()
                },
                error: function (error) {
                    console.log(error.responseText)
                },
            })
        })
    }
}
