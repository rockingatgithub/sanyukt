//edit for adding comments using ajax.....
{
    //method to submit post using ajax....
    let showImageForm = function () {
        let formToggle = $('#image-form-toggle')
        formToggle.click(function (e) {
            e.preventDefault()
            let self = this
            let formValue = parseInt($(self).attr('data-form'))
            if (formValue === 0) {
                let imageForm = function () {
                    return $(`<form
                action="/posts/create/image"
                id="new-post-image"
                method="POST"
                enctype="multipart/form-data"
            >
                <input
                    name="imageVideo"
                    type="file"
                    placeholder="Upload Image"
                    id="post-image-file"
                    class="form-control-file"
                    required="true"
                />
                <label for="image-caption">Image:</label>
                <input
                    name="content"
                    placeholder="Caption"
                    value="Image indeed"
                    id="image-caption"
                    class="form-control"
                    required="true"
                />
                <input
                    type="submit"
                    value="Post"
                    id="imagePostSubmit"
                    class="btn btn-primary"
                />
            </form>`)
                }
                $(self).attr('data-form', '1')
                $('#image-form-container').prepend(imageForm)
                createImagePost()
            } else {
                $('#new-post-image').remove()
                $(self).attr('data-form', '0')
            }
        })
    }

    let showVideoForm = function () {
        let formToggle = $('#video-form-toggle')
        formToggle.click(function (e) {
            e.preventDefault()
            let self = this
            let formValue = parseInt($(self).attr('data-form'))
            if (formValue === 0) {
                let videoForm = function () {
                    return $(`<form
                action="/posts/create/video"
                id="new-post-video"
                method="POST"
                enctype="multipart/form-data"
            >
                <input
                    name="imageVideo"
                    type="file"
                    placeholder="Upload Video"
                    id="post-video-file"
                    class="form-control-file"
                    required="true"
                />
                <label for="post-video">Video:</label>
                <input
                    name="content"
                    placeholder="Caption"
                    value="video"
                    class="form-control"
                    id="post-video"
                    required="true"
                />
                <input
                    type="submit"
                    value="Post"
                    id="videoPostSubmit"
                    class="btn btn-primary"
                />
            </form>`)
                }
                $(self).attr('data-form', '1')
                $('#video-form-container').prepend(videoForm)
                createVideoPost()
            } else {
                $('#new-post-video').remove()
                $(self).attr('data-form', '0')
            }
        })
    }

    let createPost = function () {
        let newPostForm = $('#new-post-form')

        newPostForm.submit(function (e) {
            e.preventDefault()

            $.ajax({
                type: 'post',
                url: '/posts/create/text',
                data: newPostForm.serialize(),
                success: function (data) {
                    let newPost = newPostDom(data.data.post)
                    $('#posts-list-box>ul').prepend(newPost)
                    deletePost($(' .delete-post-button', newPost)) //space before .delete... represent it's inside form...
                    // console.log(data);
                    //call the create comment class....
                    new PostComments(data.data.post._id)

                    //enable the functionality of the toggle like buttton....
                    new ToggleLike($(' .toggle-like-button', newPost))

                    new Noty({
                        theme: 'relax',
                        text: 'Post published!',
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

    //method to create a image post......

    let createImagePost = function () {
        $('#imagePostSubmit').click(function (event) {
            event.preventDefault()
            let newPostForm = $('#new-post-image')[0]
            let newPostData = new FormData(newPostForm)
            let imagefile = $('#post-image-file').val()
            if (imagefile === '') {
                alert('empty input file')
                return false
            }
            $('#imagePostSubmit').prop('disabled', true)

            $.ajax({
                type: 'post',
                url: '/posts/create/image',
                enctype: 'multipart/form-data',
                data: newPostData,
                processData: false, //prevent jquery to tranform data to query string.....
                contentType: false,
                cache: false,
                timeout: 600000,
                success: function (data) {
                    let newPost = newImagePostDom(data.data.post)
                    $('#posts-list-box>ul').prepend(newPost)
                    deletePost($(' .delete-post-button', newPost)) //space before .delete... represent it's inside form...
                    // console.log(data);
                    //call the create comment class....
                    new PostComments(data.data.post._id)

                    //enable the functionality of the toggle like buttton....
                    new ToggleLike($(' .toggle-like-button', newPost))

                    new Noty({
                        theme: 'relax',
                        text: 'Post published!',
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500,
                    }).show()
                },
                error: function (error) {
                    console.log(error.responseText)
                },
            })
            $('#imagePostSubmit').prop('disabled', false)
        })
    }

    let createVideoPost = function () {
        $('#videoPostSubmit').click(function (event) {
            event.preventDefault()
            let newPostForm = $('#new-post-video')[0]
            let newPostData = new FormData(newPostForm)
            let videofile = $('#post-video-file').val()
            if (videofile === '') {
                alert('empty input file')
                return false
            }
            $('#videoPostSubmit').prop('disabled', true)
            console.log('I ran')
            $.ajax({
                type: 'post',
                url: '/posts/create/video',
                enctype: 'multipart/form-data',
                data: newPostData,
                processData: false, //prevent jquery to tranform data to query string.....
                contentType: false,
                cache: false,
                timeout: 600000,
                success: function (data) {
                    let newPost = newVideoPostDom(data.data.post)
                    $('#posts-list-box>ul').prepend(newPost)
                    deletePost($(' .delete-post-button', newPost)) //space before .delete... represent it's inside form...
                    // console.log(data);
                    //call the create comment class....
                    new PostComments(data.data.post._id)

                    //enable the functionality of the toggle like buttton....
                    new ToggleLike($(' .toggle-like-button', newPost))

                    new Noty({
                        theme: 'relax',
                        text: 'Post published!',
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500,
                    }).show()
                },
                error: function (error) {
                    console.log(error.responseText)
                },
            })
            $('#videoPostSubmit').prop('disabled', false)
        })
    }

    //method to create a post in DOM...
    let newPostDom = function (post) {
        //show the count of zero likes on this post....
        return $(`<li id="post-${post._id}" class="list-group-item">
        <div class="card" style="width: auto;">
            <div class="card-header">
                <small>
                    <a
                        class="delete-post-button"
                        href="/posts/destroy/${post._id}"
                        ><img src="/images/trash.svg" height="20px" width="20px"
                    /></a>
                </small>
                ${post.user.name}
            </div>
            <div class="card-body">
                ${post.content}
            </div>
            <div class="card-footer">
                <small class="likebox">
                <div class="likeOptions">
                    <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post&reaction=like">
                    <span class="emojis-post">👍</span>
                    </a>
                    <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post&reaction=love">
                        <span class="emojis-post">❤️</span>
                    </a>
                    <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post&reaction=haha">
                        <span class="emojis-post">😆</span>
                    </a>
                    <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post&reaction=anger">
                        <span class="emojis-post">😡</span>
                    </a>
                    <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post&reaction=sad">
                        <span class="emojis-post">☹️</span>
                    </a>
                </div>

                </small>
                <div id="post-comments">
                    
                    <form
                        action="/comments/create"
                        method="POST"
                        id="post-${post._id}-comments-form"
                    >
                        <div class="form-group">
                            <input
                                type="text"
                                name="content"
                                placeholder="add your comments here.."
                                class="form-control"
                                required
                            />
                        </div>
                        <input type="hidden" name="post" value="${post._id}" />
                        <input
                            type="submit"
                            value="Add Comment"
                            class="btn btn-primary"
                        />
                    </form>
                    <div class="post-comments-list">
                        <ul id="post-comments-${post._id}" class="list-group">
                
                        </ul>
                    </div>
                </div>
            </div>
    </div>
</li>`)
    }

    //post DOM for image post....

    let newImagePostDom = function (post) {
        return $(`<li id="post-${post._id}" class="list-group-item">
        <div class="post-image-box card" style="width: auto;">
        <div class="card-header">
            <small>
                <a class="delete-post-button" href="/posts/destroy/${post._id}"><img src="/images/trash.svg" height="20px" width="20px" /></a>
            </small>
            ${post.user.name}
        </div>
            <img src="${post.imageVideo}" height="400" width="auto" class="post-image-src card-img-top" />
            <div class="card-body">
                ${post.content}
            </div>
            <div class="card-footer">
                <small class="likebox">
                    <div class="likeOptions">
                    <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post&reaction=like">
                        <span class="emojis-post">👍</span>
                    </a>
                    <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post&reaction=love">
                        <span class="emojis-post">❤️</span>
                    </a>
                    <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post&reaction=haha">
                        <span class="emojis-post">😆</span>
                    </a>
                    <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post&reaction=anger">
                        <span class="emojis-post">😡</span>
                    </a>
                    <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post&reaction=sad">
                        <span class="emojis-post">☹️</span>
                    </a>
                    </div>  
                </small>
        <div id="post-comments">
                <form action="/comments/create" method="POST" id="post-${post._id}-comments-form">
                    <div class="form-group">
                        <input type="text" name="content" placeholder="add your comments here.." class="form-control" required/>
                    </div>
                    <input type="hidden" name="post" value="${post._id}" />
                    <input type="submit" value="Add Comment" class="btn btn-primary" />
                </form>
            <div class="post-comments-list">
                <ul id="post-comments-${post._id}">
                    
                </ul>
            </div>
        </div>
       </div> 
    </div>    
    </li>`)
    }

    let newVideoPostDom = function (post) {
        return $(`<li id="post-${post._id}" class="list-group-item">
        <div class="post-video-box card" style="width: auto;">
            <div class="card-header">
                <small>
                    <a class="delete-post-button" href="/posts/destroy/${post._id}"><img src="/images/trash.svg" height="20px" width="20px" /></a>
                </small>
                ${post.user.name}
            </div>
                <video class="post-video-src card-top-img" controls preload="auto" width="auto" height="400">
                    <source src="${post.imageVideo}" type="video/mp4" />
                    <!-- <source src="MY_VIDEO.webm" type="video/webm" /> -->
                </video>
            <div class="card-body">
                ${post.content}
            </div>
            <div class="card-footer">
                <small class="likebox">
                    <div class="likeOptions">
                        <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post&reaction=like">
                            <span class="emojis-post">👍</span>
                        </a>
                        <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post&reaction=love">
                            <span class="emojis-post">❤️</span>
                        </a>
                        <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post&reaction=haha">
                            <span class="emojis-post">😆</span>
                        </a>
                        <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post&reaction=anger">
                            <span class="emojis-post">😡</span>
                        </a>
                        <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post&reaction=sad">
                            <span class="emojis-post">☹️</span>
                        </a>
                    </div>
                </small>
                <div id="post-comments">
                    <form action="/comments/create" method="POST" id="post-${post._id}-comments-form">
                        <div class="form-group">    
                            <input type="text" name="content" placeholder="add your comments here.." class="form-control" required/>
                        </div>    
                            <input type="hidden" name="post" value="${post._id}" />
                            <input type="submit" value="Add Comment" class="btn btn-primary" />
                    </form>
                    <div class="post-comments-list">
                        <ul id="post-comments-${post._id}">
            
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </li>`)
    }

    //method to delete a post from DOM...
    let deletePost = function (deleteLink) {
        $(deleteLink).click(function (e) {
            e.preventDefault()

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function (data) {
                    console.log(data)
                    $(`#post-${data.data.post_id}`).remove()
                    new Noty({
                        theme: 'relax',
                        text: 'Post Deleted',
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

    let convertPostsToAjax = function () {
        $('#posts-list-box>ul>li').each(function () {
            let self = $(this)
            let deleteButton = $(' .delete-post-button', self)
            deletePost(deleteButton)

            //get post's id by splitting the id attribute
            let postId = self.prop('id').split('-')[1]
            new PostComments(postId)
        })
    }

    showImageForm()
    showVideoForm()
    createPost()
    createImagePost()
    createVideoPost()
    convertPostsToAjax()
}
//actualluy comment.likes is undefined..that is y it is not reading it
