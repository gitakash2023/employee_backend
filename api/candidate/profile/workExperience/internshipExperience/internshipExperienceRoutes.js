const express = require('express');
const { 
    createInternshipExperience, 
    getAllInternshipExperiences, 
    getInternshipExperienceById, 
    updateInternshipExperience, 
    deleteInternshipExperience 
} = require('./internshipExperienceController');

const { authenticateJWT } = require('../../../../../middleware/authMiddleware');

const router = express.Router();

// Route to create a new internship experience (POST)
router.post('/', authenticateJWT, createInternshipExperience);

// Route to get all internship experiences (GET)
router.get('/', authenticateJWT, getAllInternshipExperiences);

// Route to get an internship experience by ID (GET)
router.get('/:id', authenticateJWT, getInternshipExperienceById);

// Route to update an internship experience by ID (PUT)
router.put('/:id', authenticateJWT, updateInternshipExperience);

// Route to delete an internship experience by ID (DELETE)
router.delete('/:id', authenticateJWT, deleteInternshipExperience);

module.exports = router;
