const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');


//use express-ejs-layouts..
app.use(expressLayouts);



//use the router..
app.use('/', require('./routes'));

//setup the views engines..
app.set('view engine', 'ejs');
app.set('views', './views');
app.listen(port, function(err){
    if(err)
    {
        console.log(`error running server on port: ${port}`);
    }
    console.log(`Server is running on port: ${port}`);
})