// controllers/curationController.js
const curationService = require('../services/curationService');

// Create a new curation
async function createCuration(req, res) {
    try {
        console.log('create',req.body)
        const newCuration = await curationService.createCuration(req.body);
        //console.log
        res.status(201).json(newCuration);  // Başarılıysa 201 status koduyla yeni curation'ı döndür
    } catch (error) {
        res.status(400).json({ error: error.message });  // Hata durumunda 400 döndür
    }
}

// Get all curations
async function getAllCurations(req, res) {
    try {
        const curations = await curationService.getAllCurations();
        res.status(200).json(curations);  // Başarılıysa 200 status koduyla curations'ları döndür
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Get a curation by ID
async function getCurationById(req, res) {
    try {
        const curation = await curationService.getCurationById(req.params.id);
        if (!curation) {
            return res.status(404).json({ error: 'Curation not found' });  // Eğer curation bulunamazsa 404 döndür
        }
        res.status(200).json(curation);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Update a curation by ID
async function updateCuration(req, res) {
    try {
        const updatedCuration = await curationService.updateCuration(req.params.id, req.body);
        if (!updatedCuration) {
            return res.status(404).json({ error: 'Curation not found' });
        }
        res.status(200).json(updatedCuration);  // Güncelenen curation'ı döndür
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Delete a curation by ID
async function deleteCuration(req, res) {
    try {
        const deletedCuration = await curationService.deleteCuration(req.params.id);
        if (!deletedCuration) {
            return res.status(404).json({ error: 'Curation not found' });
        }
        res.status(200).json({ message: 'Curation deleted successfully' });  // Silme işlemi başarılıysa mesaj döndür
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    createCuration,
    getAllCurations,
    getCurationById,
    updateCuration,
    deleteCuration,
};
