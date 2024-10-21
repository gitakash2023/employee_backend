const User = require('../users/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// User registration
const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ errors: { email: 'User already exists' } });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create new user with the hashed password
    const newUser = new User({ ...req.body, password: hashedPassword });

    // Save the user
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ errors: { general: error.message } });
  }
};

// User login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ errors: { email: 'User not found' } });
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ errors: { password: 'Invalid credentials' } });
    }

    // Create a JWT token
    const token = jwt.sign({ id: user._id, roles: user.roles }, process.env.JWT_SECRET, { expiresIn: '24h' });

    // Extract only the needed fields from the user object
    const { _id, roles } = user;

    // Send token and specific user data
    res.status(200).json({ token, _id, roles });
  } catch (error) {
    res.status(500).json({ errors: { general: error.message } });
  }
};

module.exports = { registerUser, loginUser };
