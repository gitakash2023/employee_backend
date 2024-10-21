const mongoose = require('mongoose');

const tenthEducationSchema = new mongoose.Schema({
  school_name: { type: String, required: true },
  board: { type: String, required: true },
  start_year: { type: Number, required: true },
  end_year: { type: Number, required: true },
  overall_score: { type: Number, required: true },

  // Reference to User (HR, admin, etc.) managing this candidate's education details
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

const TenthEducation = mongoose.model('TenthEducation', tenthEducationSchema);

module.exports = TenthEducation;
