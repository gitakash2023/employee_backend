const express = require('express');
const { 
  createTenthEducation, 
  getAllTenthEducation, 
  getTenthEducationById, 
  updateTenthEducation, 
  deleteTenthEducation 
} = require('./tenthEducationController');
const { authenticateJWT } = require('../../../../../middleware/authMiddleware'); 

const router = express.Router();

// Route to create a new 10th grade education entry (POST)
router.post('/', authenticateJWT, createTenthEducation);

// Route to get all 10th grade education entries (GET)
router.get('/', authenticateJWT, getAllTenthEducation);

// Route to get a specific 10th grade education entry by ID (GET)
router.get('/:id', authenticateJWT, getTenthEducationById);

// Route to update a 10th grade education entry by ID (PUT)
router.put('/:id', authenticateJWT, updateTenthEducation);

// Route to delete a 10th grade education entry by ID (DELETE)
router.delete('/:id', authenticateJWT, deleteTenthEducation);

module.exports = router;
