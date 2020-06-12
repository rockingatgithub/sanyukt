const express = require('express');
const env = require('./config/environment');
const logger = require('morgan');
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
const passportGoogle = require('./config/passport-google-oauth2-strategy');

//setup the chat server to be used with socket.io.....
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is listening on port 5000');
const path = require('path');

//convert all sass before starting of server..
if(env.name == 'development'){
    app.use(sassMiddleware({
        src: path.join(__dirname, env.asset_path, 'scss'),
        dest: path.join(__dirname, env.asset_path, 'css'),
        debug: true,
        outputStyle: 'extended',
        prefix: '/css'
    }))
}
//middlewares below
app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static(env.asset_path));
//making /uploads available to requests...
app.use('/uploads', express.static(`${__dirname}/uploads`));

app.use(logger(env.morgan.mode, env.morgan.options))

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
    secret: env.session_cookie_key,
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