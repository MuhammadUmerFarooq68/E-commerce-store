const passwordService = require('../services/passwordService');
async function forgotPassword(req, res) {
  const { email } = req.body;
try {
    await passwordService.generateOTP(email);
    return res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Forgot password error:', error);
    return res.status(500).json({ message: 'Failed to send OTP' });
  }
}
async function resetPassword(req, res) {
  const { email, otp, newPassword } = req.body;
try {
    await passwordService.resetPassword(email, otp, newPassword);
    return res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Reset password error:', error);
    return res.status(500).json({ message: 'Failed to reset password' });
  }
}
module.exports = {
  forgotPassword,
  resetPassword,
};
