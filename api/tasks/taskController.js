const Task = require('../tasks/taskModel');
const { _getAll, _getDataListById, _update, _deleteRecord, _add } = require('../utils/responseUtils');

// Get all tasks for the authenticated user
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a task by ID
const getTaskById = (req, res) => {
  _getDataListById(req, res, Task, '_id', req.params.id);
};

// Create a new task
const createTask = (req, res) => {
  const task = new Task({ ...req.body, user: req.user.id });
  _add(req, res, task);
};

// Update a task
const updateTask = (req, res) => {
  _update(req, res, Task, req.params.id);
};

// Delete a task
const deleteTask = (req, res) => {
  _deleteRecord(req, res, Task, req.params.id);
};

module.exports = { getAllTasks, getTaskById, createTask, updateTask, deleteTask };
