const mongoose = require('mongoose');

const candidatePersonalDetailsSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone_number: { type: String, required: true },
  current_location: { type: String },
  gender: { type: String },
  current_salary: { type: Number },
  linkedin_url: { type: String },
  github_url: { type: String },
  resume_document: { type: String }, 
  profile_image: { type: String }, 
  
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

const CandidatePersonalDetails = mongoose.model('CandidatePersonalDetails', candidatePersonalDetailsSchema);

module.exports = CandidatePersonalDetails;
