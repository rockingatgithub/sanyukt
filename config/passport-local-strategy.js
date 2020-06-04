const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

//authentication using passport..

let passportCallback = async function(req, email, password, done){
    //find user and establish identity..
    try{
    let user = await User.findOne({email: email})
        if(!user || user.password != password)
        {
            req.flash('error', 'Invalid Username/Password');
            return done(null, false);
        }
        return done(null, user);
    }
    catch(err)
    {
        return done(err);
    }
}

passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
    }, passportCallback));   
    


//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
});

//deserializing the user from key in the cookie..
let deserializeCallback = async function(id, done){
    try{
    let user= await User.findById(id);
    return done(null, user);
    }
    catch(err){
        return done(err);
    }
}

passport.deserializeUser(deserializeCallback);

//check if user is authenticated....

passport.checkAuthentication = function(req, res, next){
    //if signed in send to next..
    if(req.isAuthenticated()){
        return next();
    }

    //if the user is not signed in...
    return res.redirect('/users/signin');
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        //req.user contains the current signed in user from the session cookie and we are just sending it the views
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;