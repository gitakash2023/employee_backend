// Import required modules and middleware
const express = require('express');
const cors = require('cors'); // Middleware for enabling Cross-Origin Resource Sharing (CORS)
const helmet = require('helmet'); // Middleware for setting security-related HTTP headers
const morgan = require('morgan'); // Middleware for HTTP request logging
const compression = require('compression'); // Middleware for response compression
const connectDB = require('./config/dbConfig'); // Import dbConfig to connect to MongoDB
const profileRoutes = require('./api/Profile/profileRoutes'); // Import profile routes
const authRoutes = require('./api/users/userRoutes');
const taskRoutes = require('./api/tasks/taskRoutes');
const path = require('path'); // For serving static files
require('dotenv').config(); // Load environment variables from .env file

const app = express(); // Create an Express application instance
const port = process.env.PORT || 9000; // Set the port to use from environment variables or default to 9000

// Middleware
app.use(cors()); // Enables CORS to allow requests from different origins
app.use(helmet()); // Sets various HTTP headers for security
app.use(morgan('combined')); // Logs HTTP requests in a combined format
app.use(compression()); // Compresses response bodies for better performance
app.use(express.json()); // Parses incoming JSON request bodies

// Connect to MongoDB
connectDB(); // Call the function to connect to the database using the URI defined in dbConfig

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/profiles', profileRoutes);
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to my website'); // Define a simple route that responds with a welcome message
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`); // Start the server and log a message when it's running
});
