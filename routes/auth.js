// routes/auth.js
const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

// Kullanıcı kaydı
router.post('/register', registerUser);

// Oturum açma
router.post('/login', loginUser);

module.exports = router;
