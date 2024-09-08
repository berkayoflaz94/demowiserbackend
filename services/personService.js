const Person = require('../models/person');
const mongoose = require('mongoose');

const createPersonService = async (name, title, company, keywords,email) => {
    try {
      // Parametrelerin eksik olmadığından emin ol
      if (!name || !title || !company) {
        return { status: 400, data: { message: 'İsim, unvan ve şirket alanları zorunludur.' } };
      }
  
      // Aynı isimde ve aynı şirkette bir kişi olup olmadığını kontrol et
      const existingPerson = await Person.findOne({ name, company });
      if (existingPerson) {
        console.log('aynı')
        return { status: 400, data: { message: 'Bu kişi zaten bu şirkette mevcut.' } };
      }
  
      // Yeni kişi oluştur
      console.log({ name, title, company,email, keywords })
      const person = await Person.create({ name, title, company,email, keywords });
      return { status: 201, data: person };
    } catch (err) {
      return { status: 400, data: { message: err.message } };
    }
  };
  

// Diğer servis fonksiyonları
const getPeopleService = async () => {
  try {
    const people = await Person.find().populate('title').populate('company');
    return { status: 200, data: people };
  } catch (err) {
    return { status: 500, data: { message: err.message } };
  }
};
const getPeopleInCompanyService = async (companyId) => {
    try {
      const people = await Person.find({ company: companyId }).populate('title').populate('company');
      return { status: 200, data: people };
    } catch (err) {
      return { status: 500, data: { message: err.message } };
    }
  };
  
  

const getPersonByIdService = async (id) => {
  try {
    const person = await Person.findById(id).populate('title').populate('company');
    if (!person) {
      return { status: 404, data: { message: 'Kişi bulunamadı' } };
    }
    return { status: 200, data: person };
  } catch (err) {
    return { status: 500, data: { message: err.message } };
  }
};

const updatePersonService = async (id, name, title, company, keywords,email) => {
  try {
    const person = await Person.findByIdAndUpdate(id, { name, title, company, keywords,email }, { new: true }).populate('title').populate('company');
    if (!person) {
      return { status: 404, data: { message: 'Kişi bulunamadı' } };
    }
    return { status: 200, data: person };
  } catch (err) {
    return { status: 500, data: { message: err.message } };
  }
};

const deletePersonService = async (id) => {
  try {
    const person = await Person.findByIdAndDelete(id);
    if (!person) {
      return { status: 404, data: { message: 'Kişi bulunamadı' } };
    }
    return { status: 200, data: { message: 'Kişi başarıyla silindi' } };
  } catch (err) {
    return { status: 500, data: { message: err.message } };
  }
};

module.exports = { createPersonService, getPeopleService, getPersonByIdService, updatePersonService, deletePersonService, getPeopleInCompanyService };
