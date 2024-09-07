const _saveOTP = async (req, res, model) => {
    const { otp, via } = req.body;
    try {
      const newOTP = await model.create({ via, otp });
      res.status(201).json(newOTP);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const _verifyOTP = async (req, res, model) => {
    const { otp, via } = req.body;
    try {
      const response = await model.findOne({ via, otp });
      if (!response) {
        return res.status(404).json({ error: "OTP not found" });
      }
      await model.deleteOne({ via, otp });
      res.status(200).json({ message: "Verified" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = {
    _saveOTP,
    _verifyOTP,
  };
  