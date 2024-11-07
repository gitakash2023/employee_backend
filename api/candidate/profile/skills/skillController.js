const Skill = require('./skillModel');

// Create a new skill
const createSkill = async (req, res) => {
    try {
        const { skill_name } = req.body;

        const newSkill = new Skill({
            skill_name,
            user: req.user.id // Assuming user ID is set in JWT middleware
        });

        await newSkill.save();
        res.status(201).json(newSkill);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all skills
const getAllSkills = async (req, res) => {
    try {
        const skills = await Skill.find({ deleted: false, user: req.user.id });
        res.status(200).json(skills);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a skill by ID
const getSkillById = async (req, res) => {
    try {
        const skill = await Skill.findOne({ 
            _id: req.params.id, 
            user: req.user.id, 
            deleted: false 
        });

        if (!skill) {
            return res.status(404).json({ message: 'Skill not found or you do not have access.' });
        }

        res.status(200).json(skill);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a skill by ID
const updateSkill = async (req, res) => {
    try {
        const skill = await Skill.findById(req.params.id);
        
        if (!skill || skill.deleted) {
            return res.status(404).json({ message: 'Skill not found' });
        }

        skill.skill_name = req.body.skill_name || skill.skill_name;

        await skill.save();
        res.status(200).json(skill);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a skill by ID (soft delete)
const deleteSkill = async (req, res) => {
    try {
        const skill = await Skill.findById(req.params.id);
        
        if (!skill) {
            return res.status(404).json({ message: 'Skill not found' });
        }

        skill.deleted = true; // Soft delete
        await skill.save();
        res.status(200).json({ message: 'Skill deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createSkill,
    getAllSkills,
    getSkillById,
    updateSkill,
    deleteSkill
};
