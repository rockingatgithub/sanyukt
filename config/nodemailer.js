const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
// const env = require('./environment');
let transporter = nodemailer.createTransport(
{
    service: 'gmail',
    host: 'smtp.google.com',
    port: 587,
    secure: false,
    auth: {
        user: 'cyberkingsid@gmail.com',
        pass: 'Raja@2509'
    }
});

let renderTemplate = (data, relativePath) =>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data,
        function(err, template){
            if(err){
                console.log('error in rendering template');
                return;
            }
            mailHTML = template;
        }
    )
    return mailHTML;
}

module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}