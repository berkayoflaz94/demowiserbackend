// routes/curationRoutes.js
const express = require('express');
const curationController = require('../controllers/curationController');

const router = express.Router();

// Create a new curation
router.post('/', curationController.createCuration);

// Get all curations
router.get('/', curationController.getAllCurations);

// Get a single curation by ID
router.get('/:id', curationController.getCurationById);

// Update a curation by ID
router.put('/:id', curationController.updateCuration);

// Delete a curation by ID
router.delete('/:id', curationController.deleteCuration);

module.exports = router;
