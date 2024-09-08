const asyncHandler = require('express-async-handler');
const { createCompanyService, getCompaniesService, getCompanyByIdService, updateCompanyService, deleteCompanyService } = require('../services/companyService');

// Şirket oluşturma
const createCompany = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const result = await createCompanyService(name);
  res.status(result.status).json(result.data);
});

// Diğer controller fonksiyonları

const getCompanies = asyncHandler(async (req, res) => {
  const result = await getCompaniesService();
  res.status(result.status).json(result.data);
});

const getCompanyById = asyncHandler(async (req, res) => {
  const result = await getCompanyByIdService(req.params.id);
  res.status(result.status).json(result.data);
});

const updateCompany = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const result = await updateCompanyService(req.params.id, name);
  res.status(result.status).json(result.data);
});

const deleteCompany = asyncHandler(async (req, res) => {
  const result = await deleteCompanyService(req.params.id);
  res.status(result.status).json(result.data);
});

module.exports = { createCompany, getCompanies, getCompanyById, updateCompany, deleteCompany };
