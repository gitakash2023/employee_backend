const express = require('express');
const { 
    createProject, 
    getAllProjects, 
    getProjectById, 
    updateProject, 
    deleteProject 
} = require('./projectController');

const { authenticateJWT } = require('../../../../middleware/authMiddleware');

const router = express.Router();

// Route to create a new project (POST)
router.post('/', authenticateJWT, createProject);

// Route to get all projects (GET)
router.get('/', authenticateJWT, getAllProjects);

// Route to get a project by ID (GET)
router.get('/:id', authenticateJWT, getProjectById);

// Route to update a project by ID (PUT)
router.put('/:id', authenticateJWT, updateProject);

// Route to delete a project by ID (DELETE)
router.delete('/:id', authenticateJWT, deleteProject);

module.exports = router;
