const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    start_month: { 
        type: Date, 
        required: true 
    },
    end_month: { 
        type: Date 
    },
    description: { 
        type: String, 
        required: true 
    },
    project_link: { 
        type: String 
    },
    // Reference to the user managing the project
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

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
