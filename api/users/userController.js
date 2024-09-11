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

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ ...req.body, password: hashedPassword });

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

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ errors: { password: 'Invalid credentials' } });
    }

    // Create a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

    // Extract only the needed fields from the user object
    const { _id, first_name, last_name} = user;

    // Send token and specific user data
    res.status(200).json({ token, _id, first_name, last_name, email });
  } catch (error) {
    res.status(500).json({ errors: { general: error.message } });
  }
};

module.exports = { registerUser, loginUser };
