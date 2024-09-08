// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const asyncHandler = require('express-async-handler');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, 'tufi');

      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Yetkilendirme başarısız, token geçersiz');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Token bulunamadı, yetkilendirme reddedildi');
  }
});

module.exports = { protect };
