const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
// const env = require('./environment');

//tell passport about google strategy to use....
passport.use(new googleStrategy({
    clientID: "419536015092-7md7csdcss45prfes7h89cp0a18uaq1t.apps.googleusercontent.com",
    clientSecret: "CDOD4cIAkOnQbzkTz1JpafVy",
    callbackURL: "http://localhost:8000/users/auth/google/callback",
},
    function(accessToken, refreshToken, profile, done){

        //find a user.....
        User.findOne({email: profile.emails[0].value}).exec(function(err, user){
            if(err){
                console.log('error in google strategy-passport', err);
                return;
            }
            console.log(profile);

            if(user){
                //if user found return...
                return done(null, user);
            }
            else{
                //else create a new user...
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex'),
                }, function(err, user){
                    if(err){
                        console.log('error in creting user after google strategy-passport');
                        return;
                    }
                    return done(null, user);
                })
            }
        })
    }

))