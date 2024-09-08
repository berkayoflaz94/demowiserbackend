// services/titleService.js
const Title = require('../models/title');

// Başlık oluşturma
const createTitleService = async (name, keywords) => {
    try {
      // Aynı isimde bir başlık olup olmadığını kontrol et
      const existingTitle = await Title.findOne({ name });
      console.log(existingTitle,'existingTitle')
      if (existingTitle) {
        return { status: 400, data: { message: 'Bu başlık zaten mevcut' } };
      }
  
      // Yeni başlık oluştur
      const title = await Title.create({ name, keywords });
      return { status: 201, data: title };
    } catch (err) {
      return { status: 400, data: { message: err.message } };
    }
  };

// Başlıkları listeleme
const getTitlesService = async () => {
  try {
    const titles = await Title.find();
    return { status: 200, data: titles };
  } catch (err) {
    return { status: 500, data: { message: err.message } };
  }
};

// Başlık detayını getirme
const getTitleByIdService = async (id) => {
  try {
    const title = await Title.findById(id);
    if (!title) {
      return { status: 404, data: { message: 'Başlık bulunamadı' } };
    }
    return { status: 200, data: title };
  } catch (err) {
    return { status: 500, data: { message: err.message } };
  }
};

// Başlık güncelleme
const updateTitleService = async (id, name, keywords) => {
  try {
    const title = await Title.findByIdAndUpdate(id, { name, keywords }, { new: true });
    if (!title) {
      return { status: 404, data: { message: 'Başlık bulunamadı' } };
    }
    return { status: 200, data: title };
  } catch (err) {
    return { status: 500, data: { message: err.message } };
  }
};

// Başlık silme
const deleteTitleService = async (id) => {
  try {
    const title = await Title.findByIdAndDelete(id);
    if (!title) {
      return { status: 404, data: { message: 'Başlık bulunamadı' } };
    }
    return { status: 200, data: { message: 'Başlık başarıyla silindi' } };
  } catch (err) {
    return { status: 500, data: { message: err.message } };
  }
};

module.exports = { createTitleService, getTitlesService, getTitleByIdService, updateTitleService, deleteTitleService };
