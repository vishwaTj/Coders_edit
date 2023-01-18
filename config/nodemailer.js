const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const env = require('./environment');

let transporter = nodemailer.createTransport(env.smtp);

let renderTemplate = (data,relativePath)=> {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailer',relativePath),
        data, // the context which we pass to ejs
        function(err,Template){
            if(err){
                console.log("Error in rendering Template",err);
            }
            // Template here consists of data and path.join obviously
            mailHTML = Template;
        } 
    )
    return mailHTML;
} 

module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
} 


// Codingninjas77

// rdetbdfsffbmhmud

// pzjuufedknxbyhox

// zlwlftmuzmpzuocb