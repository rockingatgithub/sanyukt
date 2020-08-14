const User = require('../models/user');
const Post = require('../models/post');
const fs = require('fs');
const path = require('path');
const axios = require('axios');


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
        let user= await User.findById(req.params.id);
        User.uploadedAvatar(req, res, function(err){
            if(err){
                console.log('*****Multer Error', err);
            }

            user.name = req.body.name;
            user.email = req.body.email;

            if(req.file){

                //delete if already a avatar in present....
                if(user.avatar && fs.existsSync(path.join(__dirname, '..', user.avatar))){
                    fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                }

                //this is saving the path of the uploaded file into the avatar field in the user...
                user.avatar = User.avatarPath + '/' + req.file.filename;
            }
            user.save();
            return res.redirect('back');
        });
        }
        catch(err)
        {
            console.log('Error', err);
            return res.redirect('back');
        }
    }
    else{
        req.flash('error', 'Unauthorized!');
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
            let user=await User.create({
                email: req.body.email,
                name: req.body.name,
                password: req.body.password,
                userType: req.params.userType,  
            }
                )
            return res.redirect('/users/signin');
        }
        else{
            req.flash('success', 'You have signed up, login to continue!');
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
    req.flash('success', "Logged-in successfully"); //just before the response....
    return res.redirect('/');
}


//to logout users..
module.exports.destroySession = function(req, res){
    req.logout();
    req.flash('success', "Logged-out successfully");
    return res.redirect('/');
}

