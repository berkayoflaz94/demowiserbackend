const asyncHandler = require('express-async-handler');
const { createPersonService, getPeopleService, getPersonByIdService, updatePersonService, deletePersonService, getPeopleInCompanyService } = require('../services/personService');

// Kişi oluşturma
const createPerson = asyncHandler(async (req, res) => {
  const { name, title, company, keywords,email } = req.body;
  const result = await createPersonService(name, title, company, keywords,email);
  res.status(result.status).json(result.data);
});

// Diğer controller fonksiyonları

const getPeople = asyncHandler(async (req, res) => {
  const result = await getPeopleService();
  res.status(result.status).json(result.data);
});

const getPeopleInCompany = asyncHandler(async (req, res) => {
    const result = await getPeopleInCompanyService(req.params.id);
    res.status(result.status).json(result.data);
  });

const getPersonById = asyncHandler(async (req, res) => {
  const result = await getPersonByIdService(req.params.id);
  res.status(result.status).json(result.data);
});

const updatePerson = asyncHandler(async (req, res) => {
  const { name, title, company, keywords,email } = req.body;
  const result = await updatePersonService(req.params.id, name, title, company, keywords,email);
  res.status(result.status).json(result.data);
});

const deletePerson = asyncHandler(async (req, res) => {
  const result = await deletePersonService(req.params.id);
  res.status(result.status).json(result.data);
});

module.exports = { createPerson, getPeople, getPersonById, updatePerson, deletePerson, getPeopleInCompany };
