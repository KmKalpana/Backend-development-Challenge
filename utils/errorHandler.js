// utils/errorHandler.js
exports.errorHandler = (error, res) => {
  console.error(error);
  res.status(500).json({ error: "Internal Server Error" });
};
