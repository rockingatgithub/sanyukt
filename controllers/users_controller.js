const User = require('../models/user');
const Post = require('../models/post');
module.exports.profile =function(req, res){
    User.findById(req.params.id, function(err, user){
        return res.render('user_profile',{
            title: "Profile",
            profile_user: user
        })
    })
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

module.exports.create = function(req, res){
    
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    //check if user already exists in db..
    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            console.log('error in finding user while sign up');
            return
        }

        if(!user){
            User.create(req.body, function(err, user){
                if(err){
                    console.log('error in creating user whle signing up');
                    return;
                }
                return res.redirect('/users/signin');
            })
        }
        else{
            return res.redirect('back');
        }
    })

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