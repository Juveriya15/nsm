const mongoose = require("mongoose");

const sisterNodalSchema = new mongoose.Schema({
  name: String,
   url:String,
  photo: String,
 
});

module.exports = mongoose.model("SisterNodal", sisterNodalSchema);
