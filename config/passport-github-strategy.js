const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const crypto = require('crypto');
const User = require('../models/user');


passport.use( new GitHubStrategy({
    clientID: '2d62d4c197660705aadd',
    clientSecret: '655fd8692b204c731c8f68d323bd14062e6fad64',
    callbackURL: 'http://localhost:8000/users/auth/github/callback'
},
    function(accessToken, refreshToken, profile, done) {
         //find a user.....
         User.findOne({email: profile.emails[0].value}).exec(function(err, user){
            if(err){
                console.log('error in github strategy-passport', err);
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
                        console.log('error in creting user after github strategy-passport');
                        return;
                    }
                    return done(null, user);
                })
            }
        })
    }
));