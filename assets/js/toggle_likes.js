// create a class to toggle likes when a link is clicked, using AJAX....
class ToggleLike{
    constructor(toggleElement){
        this.toggler = toggleElement;
        this.togglelike();
    }

    togglelike(){
        $(this.toggler).click(function(e){
            e.preventDefault();
            let self = this;

            //this is a new way of writing ajax this is for toggle likes ....i know 
            $.ajax({
                type: 'GET',
                url: $(self).attr('href'),
            })
            .done(function(data){
                let likesCount = parseInt($(self).attr('data-likes'));
                if(data.data.deleted == true && likesCount != 0){
                    likesCount -= 1;
                }else{
                    likesCount += 1;
                }
                console.log(likesCount);
                $(self).attr('data-likes', likesCount);
                let emoji = '👍🏻';
                if(data.data.likeType === 'love'){
                    emoji = '❤️'
                }
                else if(data.data.likeType === 'haha')
                {
                    emoji = '😆'
                }
                else if(data.data.likeType === 'anger')
                {
                    emoji='😡'
                }
                else if(data.data.likeType === 'sad'){
                    emoji = '☹️'
                }
                else
                {
                    emoji = '👍'
                }
                $(self).html(`${likesCount} ${emoji}`);
            })
            .fail(function(errData){
                console.log('error in completing the request', errData);
            });
        });
    }
}