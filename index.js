const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db=require('./config/mongoose');

//used for session cookie..
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

//middlewares below
app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));
//extract syles and scripts..
//use express-ejs-layouts..
app.use(expressLayouts);

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


//setup the views engines..
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name:'sanyukt',
    //todo change secret before deployment..
    secret:'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: (1000*60*100) //in milliseconds
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);



//use the router..after required middlewares called..
app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err)
    {
        console.log(`error running server on port: ${port}`);
    }
    console.log(`Server is running on port: ${port}`);
})