const express = require('express');
const { registerUser, loginUser } = require('./userController');
const { validateRegister, validateLogin } = require('../../middleware/validationMiddleware');
const router = express.Router();

// Route to register a new user
router.post('/register', validateRegister, registerUser);

// Route to login an existing user
router.post('/login', validateLogin, loginUser);

module.exports = router;
