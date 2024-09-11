const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const connectDB = require('./config/dbConfig');
const profileRoutes = require('./api/Profile/profileRoutes');
const authRoutes = require('./api/users/userRoutes');
const taskRoutes = require('./api/tasks/taskRoutes');
const { authenticateJWT } = require('./middleware/authMiddleware');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 9000;

app.use(cors());
app.use(helmet());
app.use(morgan('combined'));
app.use(compression());
app.use(express.json());

connectDB();

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/profiles', profileRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/tasks', authenticateJWT, taskRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to my website');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
