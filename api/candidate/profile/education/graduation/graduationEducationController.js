const GraduationEducation = require('./graduationEducationModel');

// Create a new Graduation Education entry
const createGraduationEducation = async (req, res) => {
  try {
    const newGraduationEducation = new GraduationEducation({
      ...req.body,
      user: req.user.id // Assuming you are using JWT for authentication
    });

    await newGraduationEducation.save();
    res.status(201).json(newGraduationEducation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all Graduation Education entries
const getAllGraduationEducation = async (req, res) => {
  try {
    const graduationEducationEntries = await GraduationEducation.find({ deleted: false });
    res.status(200).json(graduationEducationEntries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Graduation Education entry by ID
const getGraduationEducationById = async (req, res) => {
  try {
    const graduationEducationEntry = await GraduationEducation.findById(req.params.id);

    if (!graduationEducationEntry || graduationEducationEntry.deleted) {
      return res.status(404).json({ message: 'Graduation Education entry not found' });
    }

    res.status(200).json(graduationEducationEntry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a Graduation Education entry by ID
const updateGraduationEducation = async (req, res) => {
  try {
    const graduationEducationEntry = await GraduationEducation.findById(req.params.id);

    if (!graduationEducationEntry || graduationEducationEntry.deleted) {
      return res.status(404).json({ message: 'Graduation Education entry not found' });
    }

    Object.assign(graduationEducationEntry, req.body);
    await graduationEducationEntry.save();

    res.status(200).json(graduationEducationEntry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a Graduation Education entry by ID (soft delete)
const deleteGraduationEducation = async (req, res) => {
  try {
    const graduationEducationEntry = await GraduationEducation.findById(req.params.id);

    if (!graduationEducationEntry) {
      return res.status(404).json({ message: 'Graduation Education entry not found' });
    }

    graduationEducationEntry.deleted = true; // Soft delete
    await graduationEducationEntry.save();

    res.status(200).json({ message: 'Graduation Education entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createGraduationEducation,
  getAllGraduationEducation,
  getGraduationEducationById,
  updateGraduationEducation,
  deleteGraduationEducation,
};
