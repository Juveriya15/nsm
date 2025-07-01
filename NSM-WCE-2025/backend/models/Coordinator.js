const mongoose = require("mongoose");

const coordinatorSchema = new mongoose.Schema({
  name: String,
  email: String,
  url:String,
  photo: String, 
});

module.exports = mongoose.model("Coordinator", coordinatorSchema);
