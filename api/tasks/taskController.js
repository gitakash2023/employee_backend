// controllers/tasksController.js
const { _getAll, _getDataListById, _update, _deleteRecord, _add } = require('../../utils/crudUtils');
const Task = require('../tasks/taskModel'); // Adjust path as needed

const { _paginate } = require('../../utils/paginationUtils'); // Import pagination utility


// Get all tasks for the logged-in user with search, filter, and pagination functionality
const getAllTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const { searchQuery = '', status = 'All', page = 1, pageSize = 5 } = req.query;

    // Create filter object
    let filter = { user: userId, deleted: false };

    // Apply status filter if not "All"
    if (status !== 'All') {
      filter.status = status;
    }

    // If a search query is provided, filter tasks by title or description
    if (searchQuery) {
      filter.$or = [
        { title: { $regex: searchQuery, $options: 'i' } }, // case-insensitive regex search on title
        { description: { $regex: searchQuery, $options: 'i' } } // case-insensitive regex search on description
      ];
    }

    // Fetch tasks with pagination
    const paginatedTasks = await _paginate(Task, page, pageSize, filter);

    res.status(200).json(paginatedTasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Get task by ID
const getTaskById = async (req, res) => {
  try {
    const userId = req.user.id;
    const task = await Task.findOne({ _id: req.params.id, user: userId });
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new task
const createTask = async (req, res) => {
  try {
    const { title, description, status, due_date } = req.body;

    const userId = req.user.id; // Ensure JWT middleware sets the user ID on req.user

    const newTask = new Task({
      title,
      description,
      due_date,
      status, 
      user: userId,  
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update task
const updateTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await Task.findOneAndUpdate(
      { _id: req.params.id, user: userId }, // Ensure the task belongs to the user
      req.body, // Make sure req.body contains the fields you want to update, like status
      { new: true }
    );
    if (!result) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json({ message: "Update successful", data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete task
const deleteTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await Task.findOneAndDelete({ _id: req.params.id, user: userId });
    if (!result) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json({ message: "Delete successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
