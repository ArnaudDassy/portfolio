"use strict";

var nodemailer = require('nodemailer');

module.exports = function( oRequest, oResponse ) {

// create reusable transporter object using SMTP transport
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'arnaud.dassy.6373@gmail.com',
            pass: 'DJlzZdUJ63'
        }
    });

// setup e-mail data with unicode symbols
    var mailOptions = {
        from: oRequest.body.email, // sender address
        to: 'arnaud.dassy@gmail.com',
        subject: oRequest.body.objet,
        text: oRequest.body.message
    };
    console.log(mailOptions);

    oResponse.redirect('./redirect');

// send mail with defined transport object
   /* transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }

    });*/

};