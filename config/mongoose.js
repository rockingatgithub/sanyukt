const mongoose= require('mongoose');
const env = require('./environment')
mongoose.connect(`mongodb://localhost/${env.db}`);

const db= mongoose.connection;

db.on('error', console.error.bind(console, "error in connect to database"));

db.once('open', function(){
    console.log("Connected to db");
});

module.exports = db;