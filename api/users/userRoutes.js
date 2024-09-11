const express = require('express');
const { registerUser, loginUser } = require('./userController');
const { validateRegister, validateLogin } = require('../../middleware/validationMiddleware');
const router = express.Router();

router.post('/register', validateRegister, registerUser);
router.post('/login', validateLogin, loginUser);

module.exports = router;
