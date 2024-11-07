const mongoose = require('mongoose');

const internshipExperienceSchema = new mongoose.Schema({
    designation: { type: String, required: true },
    profile: { type: String, required: true },
    organization: { type: String, required: true },
    location: { type: String, required: true },
    is_work_from_home: { type: Boolean, default: false },
    start_date: { type: Date, required: true },
    end_date: { type: Date },
    currently_working: { type: Boolean, default: false },
    // Reference to the user managing this internship
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

const InternshipExperience = mongoose.model('InternshipExperience', internshipExperienceSchema);

module.exports = InternshipExperience;
