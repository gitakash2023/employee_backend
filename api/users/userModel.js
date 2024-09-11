const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  first_name: { type: String, trim: true },
  last_name: { type: String, trim: true },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true, 
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']  // Email validation
  },
  password: { 
    type: String, 
    required: true, 
    minlength: [6, 'Password must be at least 6 characters long'] // Password length validation
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
