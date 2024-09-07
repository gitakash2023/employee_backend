const _getRoleData = async (req, res, model) => {
    const { memberId } = req.params;
  
    try {
      const data = await model.find({ member_id: memberId });
      if (!data.length) {
        return res.status(404).json({ error: "No records found" });
      }
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const _updateRole = async (req, res, model) => {
    const { memberId } = req.params;
    const data = req.body;
  
    try {
      const result = await model.updateOne({ member_id: memberId }, data);
      if (result.nModified === 0) {
        return res.status(404).json({ error: "Record not found" });
      }
      res.status(200).json({ message: "Update successful" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = {
    _getRoleData,
    _updateRole,
  };
  