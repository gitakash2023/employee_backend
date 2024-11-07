const express = require('express');
const { 
    createSkill, 
    getAllSkills, 
    getSkillById, 
    updateSkill, 
    deleteSkill 
} = require('./skillController');

const { authenticateJWT } = require('../../../../middleware/authMiddleware');

const router = express.Router();

// Route to create a new skill (POST)
router.post('/', authenticateJWT, createSkill);

// Route to get all skills (GET)
router.get('/', authenticateJWT, getAllSkills);

// Route to get a skill by ID (GET)
router.get('/:id', authenticateJWT, getSkillById);

// Route to update a skill by ID (PUT)
router.put('/:id', authenticateJWT, updateSkill);

// Route to delete a skill by ID (DELETE)
router.delete('/:id', authenticateJWT, deleteSkill);

module.exports = router;
