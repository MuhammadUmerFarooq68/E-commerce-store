const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const transporter = require('../config/email'); 
const User=require('../models/User')
async function generateOTP(email) {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }
    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); 
     user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();
    const mailOptions = {
      from: 'M.UmerFarooq', 
      to: user.email,
      subject: 'Password Reset OTP',
      text: `Your OTP for password reset is: ${otp}. It will expire in 10 minutes.`,
    };
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send OTP via email');
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  } catch (error) {
    throw new Error(error.message); 
  }
}
async function resetPassword(email, otp, newPassword) {
    try {
      const user = await User.findOne({ where: { email } });
  
      if (!user) {
        throw new Error('User not found');
      }
   if (user.otp !== otp || user.otpExpiry < new Date()) {
        throw new Error('Invalid or expired OTP');
      }
  
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.passwordHash = hashedPassword;
      user.otp = null;
      user.otpExpiry = null;
      await user.save();
    } catch (error) {
      console.error('Reset password error:', error);
      throw new Error(error.message);
    }
  }
  
module.exports = {
  generateOTP,
  resetPassword,
};
