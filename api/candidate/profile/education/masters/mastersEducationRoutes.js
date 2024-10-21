const express = require('express');
const { 
  createMastersEducation,
  getAllMastersEducation,
  getMastersEducationById,
  updateMastersEducation,
  deleteMastersEducation 
} = require('./mastersEducationController');
const { authenticateJWT } = require('../../../../../middleware/authMiddleware');

const router = express.Router();

// Route to create a new Masters Education entry (POST)
router.post('/', authenticateJWT, createMastersEducation);

// Route to get all Masters Education entries (GET)
router.get('/', authenticateJWT, getAllMastersEducation);

// Route to get Masters Education entry by ID (GET)
router.get('/:id', authenticateJWT, getMastersEducationById);

// Route to update a Masters Education entry by ID (PUT)
router.put('/:id', authenticateJWT, updateMastersEducation);

// Route to delete a Masters Education entry by ID (DELETE)
router.delete('/:id', authenticateJWT, deleteMastersEducation);

module.exports = router;
