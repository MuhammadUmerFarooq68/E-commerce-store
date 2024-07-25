const authService = require('../services/authService');
async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const token = await authService.authenticate(email, password);
    res.json({ token });
  } catch (error) {
    next(error);
  }
}
module.exports = {
  login,
};
