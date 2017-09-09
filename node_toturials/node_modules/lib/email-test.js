'use strict';
const nodemailer = require('nodemailer');
const fs=require('fs');
var rootFolder = "./screenshots/";
// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // secure:true for port 465, secure:false for port 587
    auth: {
        user: 'oyehoye005@gmail.com',
        pass: 'oyehoye005'
    }
});

// setup email data with unicode symbols
let mailOptions = {
    from: '"Fred Foo 👻" <foo@blurdybloop.com>', // sender address
    to: 'asad.hussain@trustedcompany.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world ?', // plain text body
    html: '<b>Hello world ?</b>', // html body
    attachments: [
        { filename: 'register-001.png',
            filePath: '/home/asad/Workspace/web_tests/lib/screenshots/register-001.png',
            content: fs.createReadStream('/home/asad/Workspace/web_tests/lib/screenshots/register-001.png')
        }
           // contents: fs.createReadStream('/home/asad/Workspace/web_tests/lib/screenshots/register-001.png')}
        //add as many as you wish
    ]
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
});