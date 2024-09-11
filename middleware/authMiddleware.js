require('dotenv').config(); // Ensure this is at the top of your file

const jwt = require('jsonwebtoken');

// Retrieve the JWT secret from environment variables
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in the environment variables');
}

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  console.log('Authorization Header:', authHeader);

  // Check for authorization header
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access denied. No token provided or invalid format.' });
  }

  // Extract the token from the header
  const token = authHeader.substring(7);
  console.log('Extracted Token:', token);

  // Verify the token
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error('Token verification error:', err);
      return res.status(403).json({ error: 'Invalid token.' });
    }

    // Attach the decoded user info to the request object
    req.user = decoded;
    next();
  });
};

module.exports = { authenticateJWT };
