const express = require('express');
const { 
  createGraduationEducation,
  getAllGraduationEducation,
  getGraduationEducationById,
  updateGraduationEducation,
  deleteGraduationEducation 
} = require('./graduationEducationController');
const { authenticateJWT } = require('../../../../../middleware/authMiddleware');

const router = express.Router();

// Route to create a new Graduation Education entry (POST)
router.post('/', authenticateJWT, createGraduationEducation);

// Route to get all Graduation Education entries (GET)
router.get('/', authenticateJWT, getAllGraduationEducation);

// Route to get Graduation Education entry by ID (GET)
router.get('/:id', authenticateJWT, getGraduationEducationById);

// Route to update a Graduation Education entry by ID (PUT)
router.put('/:id', authenticateJWT, updateGraduationEducation);

// Route to delete a Graduation Education entry by ID (DELETE)
router.delete('/:id', authenticateJWT, deleteGraduationEducation);

module.exports = router;

