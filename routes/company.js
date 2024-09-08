const express = require('express');
const { createCompany, getCompanies, getCompanyById, updateCompany, deleteCompany } = require('../controllers/companyController');

const router = express.Router();

// Şirket oluşturma
router.post('/', createCompany);

// Tüm şirketleri getirme
router.get('/', getCompanies);

// ID'ye göre şirket getirme
router.get('/:id', getCompanyById);

// Şirket güncelleme
router.put('/:id', updateCompany);

// Şirket silme
router.delete('/:id', deleteCompany);

module.exports = router;
