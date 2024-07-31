const nodemailer = require('nodemailer');
require('dotenv').config()
const smtpTransport = require('nodemailer-smtp-transport');

const transporter = nodemailer.createTransport(smtpTransport({
  service: 'gmail',
  auth: {
    user: process.env.USER_NAME,
    pass: process.env.PASSWORD
  }
}));
transporter.verify(function(error, success) {
  if (error) {
    console.error('Error verifying transporter:', error);
  } else {
    console.log('Nodemailer transporter is ready to send emails');
  }
});
module.exports = transporter; 
