
const userService = require('../services/userService');
const userValidator = require('../validators/validators');
async function createUser(req, res, next) {
  try {
    const { body } = req;
    const validatedData = await userValidator.validateAsync(body);
    const user = await userService.createUser(validatedData);
    res.json(user);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createUser,
};
