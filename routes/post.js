// routes/title.js
const express = require('express');

const { getRecommendation, getSearch,send_mail } = require('../controllers/postController');
const router = express.Router();
// Başlık oluşturma
router.get('/recommendation', getRecommendation);
router.get('/search', getSearch);
router.post('/sendMail', send_mail);

module.exports = router;
