// services/authService.js
const User = require('../models/user');
const generateToken = require('../utils/generateToken');

// Kullanıcı kaydı işlemi
const registerUserService = async (name, email, password) => {
  const userExists = await User.findOne({ email });

  if (userExists) {
    return { status: 400, data: { message: 'Bu e-posta zaten kullanılıyor' } };
  }

  const user = await User.create({ name, email, password });

  if (user) {
    return {
      status: 201,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      },
    };
  } else {
    return { status: 400, data: { message: 'Geçersiz kullanıcı verisi' } };
  }
};

// Oturum açma işlemi
const loginUserService = async (email, password) => {
  const user = await User.findOne({ email });
  console.log(user)
  if (user && user.password == password) {
    return {
      status: 200,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      },
    };
  } else {
    return { status: 401, data: { message: 'Geçersiz e-posta veya şifre' } };
  }
};

module.exports = { registerUserService, loginUserService };
