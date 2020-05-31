const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

//authentication using passport..

passport.use(new LocalStrategy({
    usernameField: 'email'
    },
    function(email, password, done){
        //find user and establish identity..
        User.findOne({email: email}, function(err, user){
            if(err){
                console.log('Error in finding User ----> Passport');
                return done(err);
            }

            if(!user || user.password != password)
            {
                console.log('Invalid Username/Password');
                return done(null, false);
            }

            return done(null, user);
        })
    }
    ));


//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
});

//deserializing the user from key in the cookie..

passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('Error in finding User ----> Passport');
            return done(err);
        }
        return done(null, user);
    });
});

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