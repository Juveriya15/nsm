const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const ImportantLink = require("../models/ImportantLink");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

router.post("/", upload.single("file"), async (req, res) => {
  try {
    const { title, url } = req.body;

    console.log("Incoming title:", title);
    console.log("Incoming url:", url);
    console.log("Incoming file:", req.file);

    if (!title || (!req.file && !url)) {
      return res.status(400).json({ message: "Please provide either a file or a URL." });
    }

    const newLink = new ImportantLink({
      title,
      filename: req.file ? req.file.filename : null,
      url: url && url.trim() !== "" ? url : null,
    });

    await newLink.save();
    res.status(201).json({ message: "Notice uploaded" });
  } catch (err) {
    console.error("Error uploading link:", err);
    res.status(500).json({ message: "Server error" });
  }
});


router.get("/", async (req, res) => {
  const links = await ImportantLink.find();
  res.json(links);
});

router.delete("/:id", async (req, res) => {
  await ImportantLink.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
