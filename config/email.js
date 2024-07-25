const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const transporter = nodemailer.createTransport(smtpTransport({
  service: 'gmail',
  auth: {
    user: 'engr.umerfarooq68@gmail.com',
    pass: 'csha qarc iwmd krxk'
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
