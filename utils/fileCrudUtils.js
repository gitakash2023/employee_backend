const fs = require('fs');
const path = require('path'); // Import path to handle file paths
const mongoose = require('mongoose');

// _addGallery - Adds a new gallery entry
async function _addGallery(req, res, model) {
  try {
    // Create a new gallery entry
    const newGalleryEntry = new model({
      type: req.body.type,
      description: req.body.description,
      uploaded_by: req.body.uploaded_by,
    });

    await newGalleryEntry.save(); // Save to MongoDB
    console.log(newGalleryEntry);
    res.status(201).json(newGalleryEntry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// _getAll - Retrieves all gallery entries
const _getAll = async (req, res, model) => {
  try {
    const response = await model.find(); // MongoDB equivalent of findAll
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// _delete - Deletes a gallery entry and its associated file
const _delete = async (req, res, model) => {
  try {
    const { id } = req.params;

    // Find the gallery entry by id
    const record = await model.findById(id); 
    if (!record) {
      return res.status(404).json({ error: "Record not found" });
    }

    // Delete the associated file
    const filePath = path.join(__dirname, record.filepath); // Ensure filePath is absolute
    fs.unlink(filePath, async (err) => {
      if (err && err.code === 'ENOENT') {
        console.log('File not found, but proceeding with deletion from database.');
      } else if (err) {
        throw err;
      }

      // Delete the gallery entry from MongoDB
      const response = await model.findByIdAndDelete(id); 

      if (!response) {
        return res.status(404).json({ error: "Record not found" });
      }

      res.status(200).json({ message: "Deletion successful" });
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  _addGallery,
  _getAll,
  _delete
};
