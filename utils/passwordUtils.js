const bcrypt = require('bcrypt');

const _updatePassword = async (req, res, model) => {
  const { id } = req.params;
  const { password } = req.body;

  try {
    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await model.updateOne(
      { _id: id },
      { $set: { password: hashedPassword } }
    );

    if (result.nModified === 0) {
      return res.status(404).json({ error: "Record not found" });
    }

    res.status(200).json({ message: "Update successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  _updatePassword,
};
