const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const connectDB = require('./config/dbConfig');

const authRoutes = require('./api/users/userRoutes');
const taskRoutes = require('./api/tasks/taskRoutes');
const personalDetailsRoutes = require('./api/candidate/profile/personalDetails/candidatePersonalDetailsRoutes');
const careerObjectiveRoutes = require('./api/candidate/profile/careerObjective/candidateCareerObjectiveRoutes'); 
const phdEducationRoutes = require('./api/candidate/profile/education/phd/phdEducationRoutes'); 
// const diplomaEducationRoutes = require('./api/candidate/profile/education/diploma/diplomaEducationRoutes'); 
const graduationEducationRoutes = require('./api/candidate/profile/education/graduation/graduationEducationRoutes'); 
// const mastersEducationRoutes = require('./api/candidate/profile/education/master/mastersEducationRoutes'); 
const twelfthEducationRoutes = require('./api/candidate/profile/education/twelfth/twelfthEducationRoutes'); 
const tenthEducationRoutes = require('./api/candidate/profile/education/tenth/tenthEducationRoutes'); 

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

app.use('/api/auth', authRoutes);
app.use('/api/tasks', authenticateJWT, taskRoutes);
app.use('/api/personal-details', authenticateJWT, personalDetailsRoutes);
app.use('/api/career-objectives', authenticateJWT, careerObjectiveRoutes); 
app.use('/api/phd-education', authenticateJWT, phdEducationRoutes);
// app.use('/api/diploma-education', authenticateJWT, diplomaEducationRoutes); 
app.use('/api/graduation-education', authenticateJWT, graduationEducationRoutes); 
// app.use('/api/masters-education', authenticateJWT, mastersEducationRoutes); 
app.use('/api/twelfth-education', authenticateJWT, twelfthEducationRoutes); 
app.use('/api/tenth-education', authenticateJWT, tenthEducationRoutes); 

app.get('/', (req, res) => {
    res.send('Welcome to the Easy Job Backend');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
