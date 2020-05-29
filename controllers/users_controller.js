const User = require('../models/user');

module.exports.profile =function(req, res){
    return res.render('user_profile',{
        title: "Profile"
    });
}

module.exports.signin = function(req, res){
    return res.render('signin',{
        title: "Signin"
    });
}

module.exports.signup = function(req, res){
    return res.render('signup',{
        title: "Signup"
    });
}


//get signup data...

module.exports.create = function(req, res){
    
    if(req.body.password != req.body.confirm-password){
        return res.redirect('back');
    }
    //check if user already exists in db..
    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            console.log('error in finding user while sign up');
            return;
        }

        if(!user){
            User.create(req.body, function(err, user){
                if(err){
                    console.log('error in creating user whle signing up');
                    return;
                }
                return res.redirect('/users/signin');
            });
        }
        else{
            return res.redirect('back');
        }
    })

};

//signing in and creating session..
module.exports.createSession = function(req, res){

}