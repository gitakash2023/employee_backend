const mongoose = require('mongoose');

const diplomaEducationSchema = new mongoose.Schema({
  college_name: { type: String, required: true },
  start_year: { type: Number, required: true },
  end_year: { type: Number, required: true },
  degree: { type: String, required: true },
  stream: { type: String, required: true },
  performance_score: { type: Number, required: true },
  
  // Reference to User (HR, admin, etc.) managing this candidate's education
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true,
    index: true 
  },
  deleted: { 
    type: Boolean, 
    default: false 
  }
}, { timestamps: true });

const DiplomaEducation = mongoose.model('DiplomaEducation', diplomaEducationSchema);

module.exports = DiplomaEducation;
