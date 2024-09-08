// controllers/titleController.js
const asyncHandler = require('express-async-handler');
const { createTitleService, getTitlesService, getTitleByIdService, updateTitleService, deleteTitleService } = require('../services/titleService');

// Başlık oluşturma
const createTitle = asyncHandler(async (req, res) => {
  const { name, keywords } = req.body;
  const result = await createTitleService(name, keywords);
  res.status(result.status).json(result.data);
});

// Başlıkları listeleme
const getTitles = asyncHandler(async (req, res) => {
  const result = await getTitlesService();
  res.status(result.status).json(result.data);
});

// Başlık detayını getirme
const getTitleById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await getTitleByIdService(id);
  res.status(result.status).json(result.data);
});

// Başlık güncelleme
const updateTitle = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, keywords } = req.body;
  const result = await updateTitleService(id, name, keywords);
  res.status(result.status).json(result.data);
});

// Başlık silme
const deleteTitle = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await deleteTitleService(id);
  res.status(result.status).json(result.data);
});

module.exports = { createTitle, getTitles, getTitleById, updateTitle, deleteTitle };
