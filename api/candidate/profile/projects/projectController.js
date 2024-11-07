const Project = require('./projectModel');

// Create a new project
const createProject = async (req, res) => {
    try {
        const { title, start_month, end_month, description, project_link } = req.body;

        const newProject = new Project({
            title,
            start_month,
            end_month,
            description,
            project_link,
            user: req.user.id
        });

        await newProject.save();
        res.status(201).json(newProject);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all projects
const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find({ deleted: false }).populate('user');
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a project by ID
const getProjectById = async (req, res) => {
    try {
        const project = await Project.findOne({
            _id: req.params.id,
            user: req.user.id,
            deleted: false
        }).populate('user');

        if (!project) {
            return res.status(404).json({ message: 'Project not found or you do not have access.' });
        }

        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a project by ID
const updateProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        
        if (!project || project.deleted) {
            return res.status(404).json({ message: 'Project not found' });
        }

        project.title = req.body.title || project.title;
        project.start_month = req.body.start_month || project.start_month;
        project.end_month = req.body.end_month || project.end_month;
        project.description = req.body.description || project.description;
        project.project_link = req.body.project_link || project.project_link;

        await project.save();
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a project by ID (soft delete)
const deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        project.deleted = true;
        await project.save();
        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject
};
