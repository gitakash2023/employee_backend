const express = require('express');
const { getAllTasks, getTaskById, createTask, updateTask, deleteTask } = require('./taskController');
const { validateTaskId } = require('../../middleware/validationMiddleware');
const { authenticateJWT } = require('../../middleware/authMiddleware');
const router = express.Router();

// Apply JWT authentication middleware to all routes
router.use(authenticateJWT);

router.get('/', getAllTasks); // Fetch tasks for the logged-in user
router.get('/:id', validateTaskId, getTaskById); // Fetch a specific task by ID
router.post('/', createTask); // Create a new task
router.put('/:id', validateTaskId, updateTask); // Update a specific task
router.delete('/:id', validateTaskId, deleteTask); // Delete a specific task

module.exports = router;
