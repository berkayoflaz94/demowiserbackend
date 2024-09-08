const express = require('express');
const { createPerson, getPeople, getPersonById, updatePerson, deletePerson,getPeopleInCompany } = require('../controllers/personController');

const router = express.Router();

// Kişi oluşturma
router.post('/', createPerson);


router.get('/company/:id', getPeopleInCompany);
// Tüm kişileri getirme
router.get('/', getPeople);

// ID'ye göre kişi getirme
router.get('/:id', getPersonById);

// Kişi güncelleme
router.put('/:id', updatePerson);

// Kişi silme
router.delete('/:id', deletePerson);

module.exports = router;