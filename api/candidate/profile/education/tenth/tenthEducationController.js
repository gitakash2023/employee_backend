const TenthEducation = require('./tenthEducationModel');

// Create a new 10th grade education entry
const createTenthEducation = async (req, res) => {
  try {
    const { school_name, board, start_year, end_year, overall_score } = req.body;

    const newTenthEducation = new TenthEducation({
      school_name,
      board,
      start_year,
      end_year,
      overall_score,
      user: req.user.id // Assuming req.user contains the authenticated user info
    });

    await newTenthEducation.save();
    res.status(201).json(newTenthEducation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all 10th grade education entries
const getAllTenthEducation = async (req, res) => {
  try {
    const educations = await TenthEducation.find({ user: req.user.id, deleted: false });
    res.status(200).json(educations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get 10th grade education entry by ID
const getTenthEducationById = async (req, res) => {
  try {
    const education = await TenthEducation.findById(req.params.id);

    if (!education || education.deleted) {
      return res.status(404).json({ message: 'Education entry not found' });
    }

    res.status(200).json(education);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a 10th grade education entry by ID
const updateTenthEducation = async (req, res) => {
  try {
    const education = await TenthEducation.findById(req.params.id);

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

// Delete a 10th grade education entry by ID (soft delete)
const deleteTenthEducation = async (req, res) => {
  try {
    const education = await TenthEducation.findById(req.params.id);

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
  createTenthEducation,
  getAllTenthEducation,
  getTenthEducationById,
  updateTenthEducation,
  deleteTenthEducation
};
