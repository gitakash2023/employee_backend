const InternshipExperience = require('./internshipExperienceModel');

// Create a new internship experience
const createInternshipExperience = async (req, res) => {
    try {
        const { designation, profile, organization, location, is_work_from_home, start_date, end_date, currently_working } = req.body;

        const newInternship = new InternshipExperience({
            designation,
            profile,
            organization,
            location,
            is_work_from_home,
            start_date,
            end_date,
            currently_working,
            user: req.user.id
        });

        await newInternship.save();
        res.status(201).json(newInternship);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all internship experiences
const getAllInternshipExperiences = async (req, res) => {
    try {
        const internships = await InternshipExperience.find({ deleted: false }).populate('user');
        res.status(200).json(internships);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get internship experience by ID
const getInternshipExperienceById = async (req, res) => {
    try {
        const internship = await InternshipExperience.findOne({ _id: req.params.id, user: req.user.id, deleted: false }).populate('user');

        if (!internship) {
            return res.status(404).json({ message: 'Internship experience not found or you do not have access.' });
        }

        res.status(200).json(internship);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update internship experience by ID
const updateInternshipExperience = async (req, res) => {
    try {
        const internship = await InternshipExperience.findById(req.params.id);
        
        if (!internship || internship.deleted) {
            return res.status(404).json({ message: 'Internship experience not found' });
        }

        internship.designation = req.body.designation || internship.designation;
        internship.profile = req.body.profile || internship.profile;
        internship.organization = req.body.organization || internship.organization;
        internship.location = req.body.location || internship.location;
        internship.is_work_from_home = req.body.is_work_from_home !== undefined ? req.body.is_work_from_home : internship.is_work_from_home;
        internship.start_date = req.body.start_date || internship.start_date;
        internship.end_date = req.body.end_date || internship.end_date;
        internship.currently_working = req.body.currently_working !== undefined ? req.body.currently_working : internship.currently_working;

        await internship.save();
        res.status(200).json(internship);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete internship experience by ID (soft delete)
const deleteInternshipExperience = async (req, res) => {
    try {
        const internship = await InternshipExperience.findById(req.params.id);
        
        if (!internship) {
            return res.status(404).json({ message: 'Internship experience not found' });
        }

        internship.deleted = true;
        await internship.save();
        res.status(200).json({ message: 'Internship experience deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createInternshipExperience,
    getAllInternshipExperiences,
    getInternshipExperienceById,
    updateInternshipExperience,
    deleteInternshipExperience
};
