const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema({
  title: String,
  topic: String,
  filename: String,  
  originalname: String,
  url: String, 
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Material", materialSchema);
