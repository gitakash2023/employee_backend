const express = require('express');
const upload = require('../../../../middleware/fileUpload'); // Use S3 multer configuration
const {
  createCandidatePersonalDetails,
  getAllCandidatePersonalDetails,
  getCandidatePersonalDetailsById,
  updateCandidatePersonalDetails,
  deleteCandidatePersonalDetails
} = require('../personalDetails/candidatePersonalDetailsController');

const router = express.Router();

// Route to create candidate personal details (POST)
router.post(
  '/',
  upload.fields([{ name: 'resume_document', maxCount: 1 }, { name: 'profile_image', maxCount: 1 }]),
  createCandidatePersonalDetails
);

// Route to get all candidate personal details (GET)
router.get('/', getAllCandidatePersonalDetails);

// Route to get candidate personal details by ID (GET)
router.get('/:id', getCandidatePersonalDetailsById);

// Route to update candidate personal details by ID (PUT)
router.put(
  '/:id',
  upload.fields([{ name: 'resume_document', maxCount: 1 }, { name: 'profile_image', maxCount: 1 }]),
  updateCandidatePersonalDetails
);

// Route to delete candidate personal details by ID (DELETE)
router.delete('/:id', deleteCandidatePersonalDetails);

module.exports = router;
