// controllers/authController.js
const asyncHandler = require('express-async-handler');
const { registerUserService, loginUserService } = require('../services/authService');

// Kullanıcı kaydı işlemi
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const result = await registerUserService(name, email, password);
  res.status(result.status).json(result.data);
});

// Oturum açma işlemi
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const result = await loginUserService(email, password);
  res.status(result.status).json(result.data);
});

module.exports = { registerUser, loginUser };
