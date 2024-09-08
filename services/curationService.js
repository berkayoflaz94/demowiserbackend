// services/curationService.js
const Curation = require('../models/curation');  // Curation modelini import et

// Create a new curation
async function createCuration(curationData) {
    try {
        const newCuration = new Curation(curationData);
        return await newCuration.save();  // Yeni bir curation oluştur ve kaydet
    } catch (error) {
        throw new Error('Error creating curation: ' + error.message);
    }
}

// Get all curations
async function getAllCurations() {
    try {
        return await Curation.find();  // Tüm curations'ları bul ve döndür
    } catch (error) {
        throw new Error('Error fetching curations: ' + error.message);
    }
}

// Get a single curation by ID
async function getCurationById(id) {
    try {
        return await Curation.findById(id);  // ID ile curation'ı bul
    } catch (error) {
        throw new Error('Error fetching curation: ' + error.message);
    }
}

// Update a curation by ID
async function updateCuration(id, updatedData) {
    try {
        return await Curation.findByIdAndUpdate(id, updatedData, { new: true });  // ID ile bul ve güncelle
    } catch (error) {
        throw new Error('Error updating curation: ' + error.message);
    }
}

// Delete a curation by ID
async function deleteCuration(id) {
    try {
        return await Curation.findByIdAndDelete(id);  // ID ile bul ve sil
    } catch (error) {
        throw new Error('Error deleting curation: ' + error.message);
    }
}

module.exports = {
    createCuration,
    getAllCurations,
    getCurationById,
    updateCuration,
    deleteCuration,
};
