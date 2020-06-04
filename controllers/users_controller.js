const User = require('../models/user');
const Post = require('../models/post');
module.exports.profile =async function(req, res){
    try{    
        let user= await User.findById(req.params.id)
        return res.render('user_profile',{
            title: "Profile",
            profile_user: user
        });
    }
    catch(err){
        console.log('Error', err);
    }
}

module.exports.update =async function(req, res){
    if(req.user.id == req.params.id){
        try{
        let user= await User.findByIdAndUpdate(req.params.id, req.body)
        return res.redirect('back');
        }
        catch(err)
        {
            console.log('Error', err);
        }
    }
    else{
        return res.status(401).send('Unauthorized');
    }
}

module.exports.signup = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('signup',{
        title: "Signup"
    })
}

module.exports.signin = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('signin',{
        title: "Signin"
    })
}


//get signup data...

module.exports.create = async function(req, res){
    
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    //check if user already exists in db..
    try{
        let user =await User.findOne({email: req.body.email});
        if(!user){
            let user=await User.create(req.body)
            return res.redirect('/users/signin');
        }
        else{
            return res.redirect('back');
        }
    }
    catch(err){
        console.log('Error', err);
        return;
    }

}

//signing in and creating session..
module.exports.createSession = function(req, res){
    return res.redirect('/');
}


//to logout users..
module.exports.destroySession = function(req, res){
    req.logout();
    return res.redirect('/');
}