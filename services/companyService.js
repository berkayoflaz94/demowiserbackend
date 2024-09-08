const Company = require('../models/company');

// Şirket oluşturma
const createCompanyService = async (name, industry, location) => {
  try {
    // Aynı isimde bir şirket olup olmadığını kontrol et
    const existingCompany = await Company.findOne({ name });
    if (existingCompany) {
      return { status: 400, data: { message: 'Bu şirket zaten mevcut' } };
    }

    // Yeni şirket oluştur
    const company = await Company.create({ name, industry, location });
    return { status: 201, data: company };
  } catch (err) {
    return { status: 400, data: { message: err.message } };
  }
};

// Diğer servis fonksiyonları
const getCompaniesService = async () => {
  try {
    const companies = await Company.find();
    return { status: 200, data: companies };
  } catch (err) {
    return { status: 500, data: { message: err.message } };
  }
};

const getCompanyByIdService = async (id) => {
  try {
    const company = await Company.findById(id);
    if (!company) {
      return { status: 404, data: { message: 'Şirket bulunamadı' } };
    }
    return { status: 200, data: company };
  } catch (err) {
    return { status: 500, data: { message: err.message } };
  }
};

const updateCompanyService = async (id, name, industry, location) => {
  try {
    const company = await Company.findByIdAndUpdate(id, { name, industry, location }, { new: true });
    if (!company) {
      return { status: 404, data: { message: 'Şirket bulunamadı' } };
    }
    return { status: 200, data: company };
  } catch (err) {
    return { status: 500, data: { message: err.message } };
  }
};

const deleteCompanyService = async (id) => {
  try {
    const company = await Company.findByIdAndDelete(id);
    if (!company) {
      return { status: 404, data: { message: 'Şirket bulunamadı' } };
    }
    return { status: 200, data: { message: 'Şirket başarıyla silindi' } };
  } catch (err) {
    return { status: 500, data: { message: err.message } };
  }
};

module.exports = { createCompanyService, getCompaniesService, getCompanyByIdService, updateCompanyService, deleteCompanyService };
