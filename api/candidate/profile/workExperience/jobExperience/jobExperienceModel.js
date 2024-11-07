const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const jobExperienceSchema = new mongoose.Schema({
    designation: { type: String, required: true }, // Designation or Job Title
    profile: { type: String, required: true },     // Job Profile/Function
    organization: { type: String, required: true }, // Organization Name
    location: { type: String, required: true },    // Job Location
    is_work_from_home: { type: Boolean, default: false }, // Work from home status
    start_date: { type: Date, required: true },    // Start date of the job
    end_date: { type: Date },                      // End date (null if currently working)
    currently_working: { type: Boolean, default: false }, // Currently working status
    
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true,
        index: true 
    },
    deleted: { type: Boolean, default: false } // Soft delete flag
}, { timestamps: true });

const JobExperience = mongoose.model('JobExperience', jobExperienceSchema);

module.exports = JobExperience;
