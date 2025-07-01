const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Event = require("../models/Event");

// File storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

// GET all events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (err) {
    console.error("Error fetching events:", err);
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

// POST upload event
router.post("/", upload.single("file"), async (req, res) => {
  try {
    const { title, month, year, location, participants, summary } = req.body;

    const newEvent = new Event({
      title,
      month,
      year,
      location,
      participants,
      summary,
      filename: req.file?.filename || null
    });

    await newEvent.save();
    res.status(201).json({ message: "Event added successfully" });
  } catch (err) {
    console.error("Event upload error:", err);
    res.status(500).json({ error: "Failed to upload event" });
  }
});

// UPDATE event
router.put("/:id", async (req, res) => {
  try {
    const { title, month, year, location, participants, summary } = req.body;

    const updated = await Event.findByIdAndUpdate(
      req.params.id,
      { title, month, year, location, participants, summary },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Event not found" });

    res.json({ message: "Event updated successfully", event: updated });
  } catch (err) {
    console.error("Error updating event:", err);
    res.status(500).json({ error: "Failed to update event" });
  }
});

// DELETE event by ID
router.delete("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Delete file from filesystem
    if (event.filename) {
      const filePath = path.join(__dirname, "..", "uploads", event.filename);
      fs.unlink(filePath, (err) => {
        if (err) console.warn("File deletion error (not critical):", err);
      });
    }

    // Delete document from DB
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ error: "Failed to delete event" });
  }
});

module.exports = router;
