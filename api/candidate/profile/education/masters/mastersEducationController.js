const MastersEducation = require('./mastersEducationModel');

// Create a new Masters Education entry
const createMastersEducation = async (req, res) => {
  try {
    const newMastersEducation = new MastersEducation({
      ...req.body,
      user: req.user.id // Assuming you are using JWT for authentication
    });

    await newMastersEducation.save();
    res.status(201).json(newMastersEducation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all Masters Education entries
const getAllMastersEducation = async (req, res) => {
  try {
    const mastersEducationEntries = await MastersEducation.find({ deleted: false });
    res.status(200).json(mastersEducationEntries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Masters Education entry by ID
const getMastersEducationById = async (req, res) => {
  try {
    const mastersEducationEntry = await MastersEducation.findById(req.params.id);

    if (!mastersEducationEntry || mastersEducationEntry.deleted) {
      return res.status(404).json({ message: 'Masters Education entry not found' });
    }

    res.status(200).json(mastersEducationEntry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a Masters Education entry by ID
const updateMastersEducation = async (req, res) => {
  try {
    const mastersEducationEntry = await MastersEducation.findById(req.params.id);

    if (!mastersEducationEntry || mastersEducationEntry.deleted) {
      return res.status(404).json({ message: 'Masters Education entry not found' });
    }

    Object.assign(mastersEducationEntry, req.body);
    await mastersEducationEntry.save();

    res.status(200).json(mastersEducationEntry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a Masters Education entry by ID (soft delete)
const deleteMastersEducation = async (req, res) => {
  try {
    const mastersEducationEntry = await MastersEducation.findById(req.params.id);

    if (!mastersEducationEntry) {
      return res.status(404).json({ message: 'Masters Education entry not found' });
    }

    mastersEducationEntry.deleted = true; // Soft delete
    await mastersEducationEntry.save();

    res.status(200).json({ message: 'Masters Education entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createMastersEducation,
  getAllMastersEducation,
  getMastersEducationById,
  updateMastersEducation,
  deleteMastersEducation,
};
