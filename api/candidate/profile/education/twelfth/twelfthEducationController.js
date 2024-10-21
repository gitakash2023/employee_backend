const TwelfthEducation = require('./twelfthEducationModel');

// Create a new 12th grade education entry
const createTwelfthEducation = async (req, res) => {
  try {
    const { school_name, board, start_year, end_year, overall_score } = req.body;

    const newTwelfthEducation = new TwelfthEducation({
      school_name,
      board,
      start_year,
      end_year,
      overall_score,
      user: req.user.id // Assuming req.user contains the authenticated user info
    });

    await newTwelfthEducation.save();
    res.status(201).json(newTwelfthEducation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all 12th grade education entries
const getAllTwelfthEducation = async (req, res) => {
  try {
    const educations = await TwelfthEducation.find({ user: req.user.id, deleted: false });
    res.status(200).json(educations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get 12th grade education entry by ID
const getTwelfthEducationById = async (req, res) => {
  try {
    const education = await TwelfthEducation.findById(req.params.id);

    if (!education || education.deleted) {
      return res.status(404).json({ message: 'Education entry not found' });
    }

    res.status(200).json(education);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a 12th grade education entry by ID
const updateTwelfthEducation = async (req, res) => {
  try {
    const education = await TwelfthEducation.findById(req.params.id);

    if (!education || education.deleted) {
      return res.status(404).json({ message: 'Education entry not found' });
    }

    const { school_name, board, start_year, end_year, overall_score } = req.body;

    education.school_name = school_name || education.school_name;
    education.board = board || education.board;
    education.start_year = start_year || education.start_year;
    education.end_year = end_year || education.end_year;
    education.overall_score = overall_score || education.overall_score;

    await education.save();
    res.status(200).json(education);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a 12th grade education entry by ID (soft delete)
const deleteTwelfthEducation = async (req, res) => {
  try {
    const education = await TwelfthEducation.findById(req.params.id);

    if (!education) {
      return res.status(404).json({ message: 'Education entry not found' });
    }

    education.deleted = true; // Mark as deleted instead of removing it
    await education.save();
    res.status(200).json({ message: 'Education entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createTwelfthEducation,
  getAllTwelfthEducation,
  getTwelfthEducationById,
  updateTwelfthEducation,
  deleteTwelfthEducation
};
