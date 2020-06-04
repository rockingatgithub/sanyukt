{
    //method to submit post using ajax....
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-box>ul').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));   //space before .delete... represent it's inside form...
                    // console.log(data);
                },
                error:function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    //method to create a post in DOM...
    let newPostDom =  function(post){
        return $(`<li id="post-${post._id}">
        <p>
            <small>
                <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>
            </small>
            ${post.content}
            <br>
            <small>
                ${post.user.name}
            </small>
        </p>
        <div id="post-comments">
                <form action="/comments/create" method="POST" id="post-form">
                    <input type="text" name="content" placeholder="add your comments here.." required/>
                    <input type="hidden" name="post" value="${post._id}" />
                    <input type="submit" value="Add Comment" />
                </form>
            <div class="post-comments-list">
                <ul id="post-comments- ${post._id}">
                    
                </ul>
            </div>
        </div>
</li>`)
    }

    //method to delete a post from DOM...
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                },
                error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    createPost();
}