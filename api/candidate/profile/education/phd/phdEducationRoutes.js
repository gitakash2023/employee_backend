const express = require('express');
const { 
  createPhdEducation, 
  getAllPhdEducation, 
  getPhdEducationById, 
  updatePhdEducation, 
  deletePhdEducation 
} = require('./phdEducationController');
const { authenticateJWT } = require('../../../../../middleware/authMiddleware'); 

const router = express.Router();

// Route to create a new PhD education entry (POST)
router.post('/', authenticateJWT, createPhdEducation);

// Route to get all PhD education entries (GET)
router.get('/', authenticateJWT, getAllPhdEducation);

// Route to get a specific PhD education entry by ID (GET)
router.get('/:id', authenticateJWT, getPhdEducationById);

// Route to update a PhD education entry by ID (PUT)
router.put('/:id', authenticateJWT, updatePhdEducation);

// Route to delete a PhD education entry by ID (DELETE)
router.delete('/:id', authenticateJWT, deletePhdEducation);

module.exports = router;
