//edit for adding comments using ajax.....
{
    //method to submit post using ajax....
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create/text',
                data: newPostForm.serialize(),
                success: function(data){
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-box>ul').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));   //space before .delete... represent it's inside form...
                    // console.log(data);
                    //call the create comment class....
                    new PostComments(data.data.post._id);
                    
                    //enable the functionality of the toggle like buttton....
                    new ToggleLike($(' .toggle-like-button', newPost));

                    new Noty({
                        theme: 'relax',
                        text: "Post published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();

                },
                error:function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    //method to create a post in DOM...
    let newPostDom =  function(post){
        //show the count of zero likes on this post....
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
            <br>
            <small>
            <div class="likeOptions">
            <a class="toggle-like-button" data-likes="<%=post.likes.length%>" href="/likes/toggle/?id=${post._id}&type=Post&reaction=like">
                <span class="emojis-post">👍</span>
            </a>
            <a class="toggle-like-button" data-likes="<%=post.likes.length%>" href="/likes/toggle/?id=${post._id}&type=Post&reaction=love">
                <span class="emojis-post">❤️</span>
            </a>
            <a class="toggle-like-button" data-likes="<%=post.likes.length%>" href="/likes/toggle/?id=${post._id}&type=Post&reaction=haha">
                <span class="emojis-post">😆</span>
            </a>
            <a class="toggle-like-button" data-likes="<%=post.likes.length%>" href="/likes/toggle/?id=${post._id}&type=Post&reaction=anger">
                <span class="emojis-post">😡</span>
            </a>
            <a class="toggle-like-button" data-likes="<%=post.likes.length%>" href="/likes/toggle/?id=${post._id}&type=Post&reaction=sad">
                <span class="emojis-post">☹️</span>
            </a>
        </div>
                <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post&reaction=like">
                0 Likes
                </a>
            </small>
        </p>
        <div id="post-comments">
                <form action="/comments/create" method="POST" id="post-${ post._id}-comments-form">
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
                    console.log(data);
                    $(`#post-${data.data.post_id}`).remove();
                    new Noty({
                        theme: 'relax',
                        text: "Post Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },
                error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    let convertPostsToAjax = function(){
        $('#posts-list-box>ul>li').each(function(){
            let self = $(this);
            let deleteButton = $(' .delete-post-button', self);
            deletePost(deleteButton);

            //get post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[1]
            new PostComments(postId);
        });
    }

    createPost();
    convertPostsToAjax();
}
//actuallu comment.likes is undefined..that is y it is not reading it