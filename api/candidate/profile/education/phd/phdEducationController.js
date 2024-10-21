const PhdEducation = require('./phdEducationModel');

// Create a new PhD education entry
const createPhdEducation = async (req, res) => {
  try {
    const { college_name, start_year, end_year, degree, stream, performance_score } = req.body;

    const newPhdEducation = new PhdEducation({
      college_name,
      start_year,
      end_year,
      degree,
      stream,
      performance_score,
      user: req.user.id // Assuming req.user contains the authenticated user info
    });

    await newPhdEducation.save();
    res.status(201).json(newPhdEducation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all PhD education entries
const getAllPhdEducation = async (req, res) => {
  try {
    const educations = await PhdEducation.find({ user: req.user.id, deleted: false });
    res.status(200).json(educations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get PhD education entry by ID
const getPhdEducationById = async (req, res) => {
  try {
    const education = await PhdEducation.findById(req.params.id);

    if (!education || education.deleted) {
      return res.status(404).json({ message: 'Education entry not found' });
    }

    res.status(200).json(education);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a PhD education entry by ID
const updatePhdEducation = async (req, res) => {
  try {
    const education = await PhdEducation.findById(req.params.id);

    if (!education || education.deleted) {
      return res.status(404).json({ message: 'Education entry not found' });
    }

    const { college_name, start_year, end_year, degree, stream, performance_score } = req.body;

    education.college_name = college_name || education.college_name;
    education.start_year = start_year || education.start_year;
    education.end_year = end_year || education.end_year;
    education.degree = degree || education.degree;
    education.stream = stream || education.stream;
    education.performance_score = performance_score || education.performance_score;

    await education.save();
    res.status(200).json(education);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a PhD education entry by ID (soft delete)
const deletePhdEducation = async (req, res) => {
  try {
    const education = await PhdEducation.findById(req.params.id);

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
  createPhdEducation,
  getAllPhdEducation,
  getPhdEducationById,
  updatePhdEducation,
  deletePhdEducation
};
