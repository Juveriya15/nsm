const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const SisterNodal = require("../models/SisterNodal");

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Upload Sister Nodal with image and name
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name,url } = req.body;
    if (!req.file) return res.status(400).json({ error: "No image uploaded" });
    if (!name) return res.status(400).json({ error: "Name is required" });
    if (!url) return res.status(400).json({ error: "URL is required" });

    const newNode = new SisterNodal({
      name,
      url,
      photo: req.file.filename,
      
    });
    await newNode.save();
    res.status(201).json({ message: "Uploaded" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get all Sister Nodal entries
router.get("/", async (req, res) => {
  try {
    const nodes = await SisterNodal.find();
    res.json(nodes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Delete by ID
router.delete("/:id", async (req, res) => {
  try {
    await SisterNodal.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
