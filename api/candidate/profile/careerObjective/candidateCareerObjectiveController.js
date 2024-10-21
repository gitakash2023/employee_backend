const { populate } = require('dotenv');
const { json } = require('express');
const { body } = require('express-validator');
const CandidateCareerObjective = require('../careerObjective/candidateCareerObjectiveModel');

// Create a new candidate career objective
const createCareerObjective = async (req, res) => {
    try {
        const { career_objective } = req.body;

        const newObjective = new CandidateCareerObjective({
            career_objective,
            user: req.user.id // Assuming user ID is set in JWT middleware
        });

        await newObjective.save();
        res.status(201).json(newObjective);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all candidate career objectives
const getAllCareerObjectives = async (req, res) => {
    try {
        const objectives = await CandidateCareerObjective.find({ deleted: false }).populate('user');
        res.status(200).json(objectives);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a candidate career objective by ID
const getCareerObjectiveById = async (req, res) => {
    try {
        const objective = await CandidateCareerObjective.findOne({
            _id: req.params.id,
            user: req.user.id, 
            deleted: false
        }).populate('user');

        if (!objective) {
            return res.status(404).json({ message: 'Career objective not found or you do not have access.' });
        }

        res.status(200).json(objective);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Update a candidate career objective by ID
const updateCareerObjective = async (req, res) => {
    try {
        const objective = await CandidateCareerObjective.findById(req.params.id);
        
        if (!objective || objective.deleted) {
            return res.status(404).json({ message: 'Career objective not found' });
        }

        objective.career_objective = req.body.career_objective || objective.career_objective;
        
        await objective.save();
        res.status(200).json(objective);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a candidate career objective by ID (soft delete)
const deleteCareerObjective = async (req, res) => {
    try {
        const objective = await CandidateCareerObjective.findById(req.params.id);
        
        if (!objective) {
            return res.status(404).json({ message: 'Career objective not found' });
        }

        objective.deleted = true; // Soft delete
        await objective.save();
        res.status(200).json({ message: 'Career objective deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createCareerObjective,
    getAllCareerObjectives,
    getCareerObjectiveById,
    updateCareerObjective,
    deleteCareerObjective
};
const { find, findById } = require('./candidateCareerObjectiveModel');
