const express = require('express');
const { 
    createCareerObjective, 
    getAllCareerObjectives, 
    getCareerObjectiveById, 
    updateCareerObjective, 
    deleteCareerObjective 
} = require('../careerObjective/candidateCareerObjectiveController');

const { authenticateJWT } = require('../../../../middleware/authMiddleware');

const router = express.Router();

// Route to create a new career objective (POST)
router.post('/', authenticateJWT, createCareerObjective);

// Route to get all career objectives (GET)
router.get('/', authenticateJWT, getAllCareerObjectives);

// Route to get a career objective by ID (GET)
router.get('/:id', authenticateJWT, getCareerObjectiveById);

// Route to update a career objective by ID (PUT)
router.put('/:id', authenticateJWT, updateCareerObjective);

// Route to delete a career objective by ID (DELETE)
router.delete('/:id', authenticateJWT, deleteCareerObjective);

module.exports = router;
