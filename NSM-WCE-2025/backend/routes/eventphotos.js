const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const EventPhoto = require("../models/EventPhoto");

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Upload event image
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { caption } = req.body;
    const newPhoto = new EventPhoto({
      filename: req.file.filename,
      caption: caption || "", 
    });
    await newPhoto.save();
    res.status(201).json({ message: "Photo uploaded successfully" });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Failed to upload event photo" });
  }
});

// Get all event photos
router.get("/", async (req, res) => {
  try {
    const photos = await EventPhoto.find();
    res.json(photos);
  } catch (err) {
    res.status(500).json({ error: "Fetch failed" });
  }
});

// Delete image by ID
router.delete("/:id", async (req, res) => {
  try {
    await EventPhoto.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
