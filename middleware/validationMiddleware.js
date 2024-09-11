const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');

// Validation middleware for user registration
const validateRegister = [
  body('email').isEmail().withMessage('Please enter a valid email address'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Validation middleware for user login
const validateLogin = [
  body('email').isEmail().withMessage('Please enter a valid email address'),
  body('password')
    .notEmpty()
    .withMessage('Password cannot be empty'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Middleware to validate MongoDB ObjectId
const validateTaskId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Invalid task ID' });
  }
  next();
};

module.exports = { validateRegister, validateLogin, validateTaskId };
