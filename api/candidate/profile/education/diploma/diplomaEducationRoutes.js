const express = require('express');
const { 
  createDiplomaEducation, 
  getAllDiplomaEducation, 
  getDiplomaEducationById, 
  updateDiplomaEducation, 
  deleteDiplomaEducation 
} = require('./diplomaEducationController');
const { authenticateJWT } = require('../../../../../middleware/authMiddleware');

const router = express.Router();

// Route to create a new diploma education entry (POST)
router.post('/', authenticateJWT, createDiplomaEducation);

// Route to get all diploma education entries (GET)
router.get('/', authenticateJWT, getAllDiplomaEducation);

// Route to get a specific diploma education entry by ID (GET)
router.get('/:id', authenticateJWT, getDiplomaEducationById);

// Route to update a diploma education entry by ID (PUT)
router.put('/:id', authenticateJWT, updateDiplomaEducation);

// Route to delete a diploma education entry by ID (DELETE)
router.delete('/:id', authenticateJWT, deleteDiplomaEducation);

module.exports = router;
