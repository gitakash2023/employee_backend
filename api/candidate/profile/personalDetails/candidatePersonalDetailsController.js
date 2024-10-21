const { error } = require('console');
const { populate } = require('dotenv');
const { json } = require('express');
const { body } = require('express-validator');
const path = require('path');
const { findOne, find, findById } = require('../careerObjective/candidateCareerObjectiveModel');
const CandidatePersonalDetails = require('../personalDetails/candidatePersonalDetailsModel');
const fs = require('fs');

// Create new candidate personal details
const createCandidatePersonalDetails = async (req, res) => {
  try {
    if (!req.files || !req.body) {
      return res.status(400).json({ error: 'No files or data were uploaded.' });
    }

    const {
      first_name, last_name, email, phone_number, current_location, gender,
      current_salary, linkedin_url, github_url
    } = req.body;

    // Check if required fields are missing
    if (!first_name || !last_name || !email || !phone_number) {
      return res.status(400).json({ error: 'Missing required fields: first_name, last_name, email, and phone_number are required.' });
    }

    // Check if email already exists
    const existingCandidate = await CandidatePersonalDetails.findOne({ email });
    if (existingCandidate) {
      return res.status(409).json({ error: 'A candidate with this email already exists.' }); // 409 Conflict
    }

    const resume_document = req.files['resume_document'] ? req.files['resume_document'][0].path : null;
    const profile_image = req.files['profile_image'] ? req.files['profile_image'][0].path : null; // New line for profile image

    const newCandidateDetails = new CandidatePersonalDetails({
      first_name, last_name, email, phone_number, current_location, gender,
      current_salary, linkedin_url, github_url, resume_document,
      profile_image, // Include profile_image in the new candidate details
      user: req.user.id // Assuming the user is authenticated
    });

    await newCandidateDetails.save();
    res.status(201).json({ message: 'Candidate details created successfully', data: newCandidateDetails }); // 201 Created
  } catch (error) {
    res.status(500).json({ error: error.message }); // 500 Internal Server Error
  }
};

// Get all candidate personal details
const getAllCandidatePersonalDetails = async (req, res) => {
  try {
    const details = await CandidatePersonalDetails.find({ deleted: false }).populate('user');
    if (!details.length) {
      return res.status(404).json({ message: 'No candidate personal details found' }); // 404 Not Found
    }
    res.status(200).json(details); // 200 OK
  } catch (err) {
    res.status(500).json({ error: err.message }); // 500 Internal Server Error
  }
};

// Get candidate personal details by ID
const getCandidatePersonalDetailsById = async (req, res) => {
  try {
    const details = await CandidatePersonalDetails.findById(req.params.id).populate('user');
    if (!details || details.deleted) {
      return res.status(404).json({ error: 'Candidate personal details not found' }); // 404 Not Found
    }
    res.status(200).json(details); // 200 OK
  } catch (err) {
    res.status(500).json({ error: err.message }); // 500 Internal Server Error
  }
};

// Update candidate personal details by ID
const updateCandidatePersonalDetails = async (req, res) => {
  try {
    const details = await CandidatePersonalDetails.findById(req.params.id);
    if (!details || details.deleted) {
      return res.status(404).json({ error: 'Candidate personal details not found' }); // 404 Not Found
    }

    const { first_name, last_name, email, phone_number, current_location, gender, current_salary, linkedin_url, github_url } = req.body;

    // Replace the resume document if a new one is uploaded
    if (req.files && req.files['resume_document']) {
      if (details.resume_document) {
        fs.unlinkSync(details.resume_document); // Remove the old resume file
      }
      details.resume_document = req.files['resume_document'][0].path;
    }

    // Replace the profile image if a new one is uploaded
    if (req.files && req.files['profile_image']) {
      if (details.profile_image) {
        fs.unlinkSync(details.profile_image); // Remove the old profile image file
      }
      details.profile_image = req.files['profile_image'][0].path;
    }

    details.first_name = first_name || details.first_name;
    details.last_name = last_name || details.last_name;
    details.email = email || details.email;
    details.phone_number = phone_number || details.phone_number;
    details.current_location = current_location || details.current_location;
    details.gender = gender || details.gender;
    details.current_salary = current_salary || details.current_salary;
    details.linkedin_url = linkedin_url || details.linkedin_url;
    details.github_url = github_url || details.github_url;

    await details.save();
    res.status(200).json({ message: 'Candidate personal details updated successfully', data: details }); // 200 OK
  } catch (error) {
    res.status(500).json({ error: error.message }); // 500 Internal Server Error
  }
};

// Delete candidate personal details by ID (soft delete)
const deleteCandidatePersonalDetails = async (req, res) => {
  try {
    const details = await CandidatePersonalDetails.findById(req.params.id);
    if (!details || details.deleted) {
      return res.status(404).json({ error: 'Candidate personal details not found' }); // 404 Not Found
    }

    details.deleted = true;
    await details.save();
    res.status(200).json({ message: 'Candidate personal details deleted successfully' }); // 200 OK
  } catch (error) {
    res.status(500).json({ error: error.message }); // 500 Internal Server Error
  }
};

module.exports = {
  createCandidatePersonalDetails,
  getAllCandidatePersonalDetails,
  getCandidatePersonalDetailsById,
  updateCandidatePersonalDetails,
  deleteCandidatePersonalDetails
};

