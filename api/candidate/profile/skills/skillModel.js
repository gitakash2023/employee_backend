const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    skill_name: { 
        type: String, 
        required: true 
    },
    // Reference to the user managing this skill
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

const Skill = mongoose.model('Skill', skillSchema);

module.exports = Skill;
