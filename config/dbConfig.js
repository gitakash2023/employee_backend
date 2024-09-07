// dbConfig.js

// Import the mongoose library to interact with MongoDB
const mongoose = require('mongoose');

// Define your MongoDB URI directly here
// This URI connects to a MongoDB Atlas cluster
const mongoURI = 'mongodb+srv://yogibabu32:pYeVTj61ZQxbPMvd@bvef.2hgczix.mongodb.net/?retryWrites=true&w=majority&appName=bvef';

// Define an asynchronous function to handle the connection to MongoDB
const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB using the URI
    // `mongoose.connect` is used to establish a connection to the database
    await mongoose.connect(mongoURI);

    // Log success message if connection is established
    console.log('MongoDB connected successfully');
  } catch (error) {
    // Log error message and exit the process if connection fails
    console.error('MongoDB connection failed:', error.message);
    process.exit(1); // Exit with a failure code (1)
  }
};

// Export the connectDB function to be used in other parts of the application
module.exports = connectDB;
