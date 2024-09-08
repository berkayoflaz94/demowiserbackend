// utils/generateToken.js
const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, 'tufi', {
    expiresIn: '30d',
  });
};

module.exports = generateToken;
