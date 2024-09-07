const Profile = require('../../api/Profile/profileModel');
const fs = require('fs');
const path = require('path');
const { _getAll, _getDataListById, _update, _deleteRecord, _add } = require('../../utils/crudUtils');

// Create a new profile
const createProfile = async (req, res) => {
  try {
    // Check if files are present
    if (!req.files) {
      return res.status(400).json({ error: 'No files were uploaded.' });
    }

    const {
      first_name, last_name, age, dob, gender, email, phone_number, adhar_number, pan_card, highest_education
    } = req.body;

    const adhar_number_image = req.files['adhar_number_image'] ? req.files['adhar_number_image'][0].path : null;
    const pan_card_image = req.files['pan_card_image'] ? req.files['pan_card_image'][0].path : null;
    const highest_education_certificate_image = req.files['highest_education_certificate_image'] ? req.files['highest_education_certificate_image'][0].path : null;

    // Ensure paths are valid
    if (adhar_number_image && !fs.existsSync(adhar_number_image)) {
      return res.status(404).json({ error: 'Adhar number image not found.' });
    }

    // Create and save the new profile
    const newProfile = new Profile({
      first_name, last_name, age, dob, gender, email, phone_number,
      adhar_number, adhar_number_image, pan_card, pan_card_image, highest_education, highest_education_certificate_image
    });

    await newProfile.save(); // Save to the database

    res.status(201).json(newProfile); // Send response
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Get all profiles
const getAllProfiles = (req, res) => {
  _getAll(req, res, Profile);
};

// Get profiles by field (e.g., email)
const getProfilesByField = async (req, res) => {
  const fieldName = req.params.fieldName;
  const fieldValue = req.params.fieldValue;
  _getDataListById(req, res, Profile, fieldName, fieldValue);
};

// Update a profile by ID
const updateProfile = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    // Replace files if new ones are uploaded
    if (req.files['adhar_number_image']) {
      if (profile.adhar_number_image) {
        fs.unlinkSync(profile.adhar_number_image);
      }
      profile.adhar_number_image = req.files['adhar_number_image'][0].path;
    }

    if (req.files['pan_card_image']) {
      if (profile.pan_card_image) {
        fs.unlinkSync(profile.pan_card_image);
      }
      profile.pan_card_image = req.files['pan_card_image'][0].path;
    }

    if (req.files['highest_education_certificate_image']) {
      if (profile.highest_education_certificate_image) {
        fs.unlinkSync(profile.highest_education_certificate_image);
      }
      profile.highest_education_certificate_image = req.files['highest_education_certificate_image'][0].path;
    }

    await _update(req, res, Profile, req.params.id);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a profile by ID
const deleteProfile = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    // Delete associated files
    if (profile.adhar_number_image) {
      fs.unlinkSync(profile.adhar_number_image);
    }

    if (profile.pan_card_image) {
      fs.unlinkSync(profile.pan_card_image);
    }

    if (profile.highest_education_certificate_image) {
      fs.unlinkSync(profile.highest_education_certificate_image);
    }

    await _deleteRecord(req, res, Profile, req.params.id);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createProfile,
  getAllProfiles,
  getProfilesByField,
  updateProfile,
  deleteProfile
};
