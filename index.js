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
const passportJWT = require('./config/passport-jwt-strategy');
const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');



//convert all sass before starting of server..
app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}))
//middlewares below
app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));
//making /uploads available to requests...
app.use('/uploads', express.static(`${__dirname}/uploads`));

//extract syles and scripts..
//use express-ejs-layouts..
app.use(expressLayouts);

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


//setup the views engines..
app.set('view engine', 'ejs');
app.set('views', './views');

//mongo store is used to store the session even after server restarts..
app.use(session({
    name:'sanyukt',
    //todo change secret before deployment..
    secret:'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: (1000*60*100) //in milliseconds
    },
    store: new MongoStore({
        mongooseConnection: db,
        autoRemove: 'disabled'
    },
    function(err){
        console.log(err || 'connect-mongodb setup ok');
    })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
app.use(flash());   //called after establing session...
app.use(customMware.setFlash);

//use the router..after required middlewares called..
app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err)
    {
        console.log(`error running server on port: ${port}`);
    }
    console.log(`Server is running on port: ${port}`);
})