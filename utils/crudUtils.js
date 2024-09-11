// utils/crudUtils.js
const mongoose = require('mongoose');

// Function to get all documents
const _getAll = async (req, res, model) => {
  try {
    const data = await model.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to get documents by a specific field
const _getDataListById = async (req, res, model, fieldName, fieldValue) => {
  try {
    const data = await model.find({ [fieldName]: fieldValue });
    if (!data.length) {
      return res.status(404).json({ error: "Record not found" });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to update a document by its ID
const _update = async (req, res, model, id) => {
  try {
    const result = await model.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) {
      return res.status(404).json({ error: "Record not found" });
    }
    res.status(200).json({ message: "Update successful", data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Function to delete a document by its ID
const _deleteRecord = async (req, res, model, id) => {
  try {
    const result = await model.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ error: "Record not found" });
    }
    res.status(200).json({ message: "Deletion successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to add a new document
const _add = async (req, res, model) => {
  try {
    const data = new model(req.body);
    const savedData = await data.save();
    res.status(201).json(savedData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  _getAll,
  _getDataListById,
  _update,
  _deleteRecord,
  _add,
};
