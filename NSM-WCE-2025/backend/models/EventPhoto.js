const mongoose = require("mongoose");

const eventPhotoSchema = new mongoose.Schema({
  filename: String,
  caption: String, 
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("EventPhoto", eventPhotoSchema);
