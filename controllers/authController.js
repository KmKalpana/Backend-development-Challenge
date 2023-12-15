// @ts-nocheck
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { errorHandler } = require("../utils/errorHandler");

exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this email already exists" });
    }

    const newUser = new User({ username, email, password });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, "KAL123", {
      expiresIn: "1h",
    });

    res.json({ message: "User registered successfully", token, user: newUser });
  } catch (error) {
    // errorHandler(error, res);
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;


    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } 
    );

    res.json({
      message: "Login successful",
      user: {
        userId: user._id,
        username: user.username,
        email: user.email,
      },
      token: token,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};


exports.logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Logout failed" });
    }
    res.json({ message: "Logout successful" });
  });
};