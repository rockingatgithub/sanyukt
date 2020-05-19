const express = require('express');
const app = express();
const port = 8000;

//use the router..
app.use('/', require('./routes'));


app.listen(port, function(err){
    if(err)
    {
        console.log(`error running server on port: ${port}`);
    }
    console.log(`Server is running on port: ${port}`);
})