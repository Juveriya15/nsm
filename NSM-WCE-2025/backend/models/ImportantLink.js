const mongoose = require("mongoose");

const importantLinkSchema = new mongoose.Schema({
  title: String,
  filename: String,  // for uploaded files
  url: String         // for external URLs
});

module.exports = mongoose.model("ImportantLink", importantLinkSchema);
