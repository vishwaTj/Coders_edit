const nodeMailer = require('../config/nodemailer');


// normally we export in this way 
// newComment = function()
// module.exports = newComment;

// new way to export a method
exports.newComment = (comment) => {
    // console.log('Inside newComment mailer');
    let htmlString = nodeMailer.renderTemplate({comment: comment},'/comments/new_comment.ejs');

    nodeMailer.transporter.sendMail({
        from: 'tjvishwa88@gmail.com',
        to: comment.user.email,
        subject: "New comment Published",
        html: htmlString
    },
      (err,info)=>{
        if(err){
            console.log("Error in sending mail",err);
            return;
        }
        
        // console.log("Message sent",info);
        return;
      }
    );
} 