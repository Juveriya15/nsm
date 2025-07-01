const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: String,
  month: String,
  year: String,
  location: String,
  participants: String,
  summary: String,
  filename: String,
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Event", eventSchema);
