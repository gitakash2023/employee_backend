const express = require('express');
const { 
    createJobExperience, 
    getAllJobExperiences, 
    getJobExperienceById, 
    updateJobExperience, 
    deleteJobExperience 
} = require('./jobExperienceController');

const { authenticateJWT } = require('../../../../../middleware/authMiddleware');

const router = express.Router();

// Route to create new job experience
router.post('/', authenticateJWT, createJobExperience);

// Route to get all job experiences
router.get('/', authenticateJWT, getAllJobExperiences);

// Route to get job experience by ID
router.get('/:id', authenticateJWT, getJobExperienceById);

// Route to update job experience by ID
router.put('/:id', authenticateJWT, updateJobExperience);

// Route to delete job experience by ID (soft delete)
router.delete('/:id', authenticateJWT, deleteJobExperience);

module.exports = router;
