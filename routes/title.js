// routes/title.js
const express = require('express');
const router = express.Router();
const { createTitle, getTitles, getTitleById, updateTitle, deleteTitle } = require('../controllers/titleController');

// Başlık oluşturma
router.post('/', createTitle);

// Başlıkları listeleme
router.get('/', getTitles);

// Başlık detayını getirme
router.get('/:id', getTitleById);

// Başlık güncelleme
router.put('/:id', updateTitle);

// Başlık silme
router.delete('/:id', deleteTitle);

module.exports = router;
