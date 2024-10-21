const mongoose = require('mongoose');

const candidateCareerObjectiveSchema = new mongoose.Schema({
    career_objective: { 
        type: String, 
        required: true 
    },
    // Reference to User (HR, admin, etc.) managing this candidate's career objective
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

const CandidateCareerObjective = mongoose.model('CandidateCareerObjective', candidateCareerObjectiveSchema);

module.exports = CandidateCareerObjective;
