const express = require('express');
const { getAllTasks, getTaskById, createTask, updateTask, deleteTask } = require('../tasks/taskController');
const authenticate = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', authenticate, getAllTasks);
router.get('/:id', authenticate, getTaskById);
router.post('/', authenticate, createTask);
router.put('/:id', authenticate, updateTask);
router.delete('/:id', authenticate, deleteTask);

module.exports = router;
