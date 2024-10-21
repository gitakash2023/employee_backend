const express = require('express');
const { 
  createTwelfthEducation, 
  getAllTwelfthEducation, 
  getTwelfthEducationById, 
  updateTwelfthEducation, 
  deleteTwelfthEducation 
} = require('./twelfthEducationController');
const { authenticateJWT } = require('../../../../../middleware/authMiddleware'); 

const router = express.Router();

// Route to create a new 12th grade education entry (POST)
router.post('/', authenticateJWT, createTwelfthEducation);

// Route to get all 12th grade education entries (GET)
router.get('/', authenticateJWT, getAllTwelfthEducation);

// Route to get a specific 12th grade education entry by ID (GET)
router.get('/:id', authenticateJWT, getTwelfthEducationById);

// Route to update a 12th grade education entry by ID (PUT)
router.put('/:id', authenticateJWT, updateTwelfthEducation);

// Route to delete a 12th grade education entry by ID (DELETE)
router.delete('/:id', authenticateJWT, deleteTwelfthEducation);

module.exports = router;
