const JobExperience = require('./jobExperienceModel');

// Create new job experience
const createJobExperience = async (req, res) => {
    try {
        const { designation, profile, organization, location, is_work_from_home, start_date, end_date, currently_working } = req.body;

        const newJobExperience = new JobExperience({
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

        await newJobExperience.save();
        res.status(201).json(newJobExperience);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all job experiences
const getAllJobExperiences = async (req, res) => {
    try {
        const experiences = await JobExperience.find({ user: req.user.id, deleted: false });
        res.status(200).json(experiences);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get job experience by ID
const getJobExperienceById = async (req, res) => {
    try {
        const experience = await JobExperience.findOne({ _id: req.params.id, user: req.user.id, deleted: false });

        if (!experience) {
            return res.status(404).json({ message: 'Job experience not found or you do not have access.' });
        }

        res.status(200).json(experience);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update job experience by ID
const updateJobExperience = async (req, res) => {
    try {
        const experience = await JobExperience.findById(req.params.id);

        if (!experience || experience.deleted) {
            return res.status(404).json({ message: 'Job experience not found' });
        }

        Object.assign(experience, req.body);

        await experience.save();
        res.status(200).json(experience);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete job experience by ID (soft delete)
const deleteJobExperience = async (req, res) => {
    try {
        const experience = await JobExperience.findById(req.params.id);

        if (!experience) {
            return res.status(404).json({ message: 'Job experience not found' });
        }

        experience.deleted = true;
        await experience.save();
        res.status(200).json({ message: 'Job experience deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createJobExperience,
    getAllJobExperiences,
    getJobExperienceById,
    updateJobExperience,
    deleteJobExperience
};
