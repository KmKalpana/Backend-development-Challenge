const User = require("../models/User");
const { errorHandler } = require("../utils/errorHandler");

exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ user });
  } catch (error) {
    errorHandler(error, res);
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { username, email } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.username = username || user.username;
    user.email = email || user.email;

    await user.save();

    res.json({ message: "User profile updated successfully", user });
  } catch (error) {
    errorHandler(error, res);
  }
};
