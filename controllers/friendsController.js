const User = require('../models/user');
const Friendship = require('../models/friendship');

module.exports.sendRequest = async function(req, res){
    try{
        let friends = await Friendship.findOne({
            $or: [
                {
                    from_user: req.params.id,
                    to_user: req.user._id,
                   
                },
                {
                    from_user: req.user._id,
                    to_user: req.params.id,
                   
                }
            ]
        });
        console.log('this is it'+friends);
        if(friends === null){
            friends = await Friendship.create({
                from_user: req.user._id,
                to_user: req.params.id,
                pending: true,
            })
        }
        return res.redirect('back');
    }
    catch(err){
        console.log('Error while sending request', err);
        return res.redirect('back');
    }
}

module.exports.acceptRequest = async function(req, res){
    try{
        let friends = await Friendship.findOneAndUpdate(
            {
                from_user: req.params.id,
                to_user: req.user._id,
            }, 
            {
                pending: false,
            });
        return res.redirect('back');
    }
    catch(err){
        console.log('Error occured', err);
        return res.redirect('back');
    }
}

module.exports.cancelRequest = async function(req, res){
    try{
        let friends = await Friendship.findOneAndDelete({
            $or: [
                    {
                        from_user: req.params.id,
                        to_user: req.user._id,
                        pending: true,
                    },
                    {
                        from_user: req.user._id,
                        to_user: req.params.id,
                        pending: true,
                    }
                ]
        });
        // console.log(req.params.id+' ' +req.user._id + ' ' +friends);
        

        return res.redirect('back');
    }
    catch(err){
        console.log('Error occured', err);
        return res.redirect('back');
    }
}



module.exports.removeFriend = async function(req, res){
    try{
        let friends = await Friendship.findOneAndDelete({
            $or: [
                    {
                        from_user: req.params.id,
                        to_user: req.user._id,
                        pending: false,
                    },
                    {
                        from_user: req.user._id,
                        to_user: req.params.id,
                        pending: false,
                    }
                ]
        });

        return res.redirect('back');
    }
    catch(err){
        console.log('Error occured', err);
        return res.redirect('back');
    }
}