const express = require('express');
const upload = require('../../config/multerConfig');
const {
  createProfile,
  getAllProfiles,
  getProfilesByField,
  updateProfile,
  deleteProfile
} = require('../../api/Profile/profileController.js');

const router = express.Router();

// Route to create a new profile (POST)
router.post('/', upload.fields([
  { name: 'adhar_number_image', maxCount: 1 },
  { name: 'pan_card_image', maxCount: 1 },
  { name: 'highest_education_certificate_image', maxCount: 1 }
]), createProfile);

// Route to get all profiles (GET)
router.get('/', getAllProfiles);

// Route to get profiles by specific field (GET)
router.get('/field/:fieldName/:fieldValue', getProfilesByField);

// Route to update a profile by ID (PUT)
router.put('/:id', upload.fields([
  { name: 'adhar_number_image', maxCount: 1 },
  { name: 'pan_card_image', maxCount: 1 },
  { name: 'highest_education_certificate_image', maxCount: 1 }
]), updateProfile);

// Route to delete a profile by ID (DELETE)
router.delete('/:id', deleteProfile);

module.exports = router;
