const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: { type: Number, default: Math.floor(99999999 * Math.random()) },
  login: { type: String, default: "null" },
  email: { type: String, unique: true, required: true },
  profile_picture: { type: String, required: false },
  password: { type: String },
  type: { type: Boolean, default: false },
  token: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("user", userSchema);
