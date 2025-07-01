const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

// POST /api/admin/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("Login request received:", email, password);
  try {
    const admin = await Admin.findOne({ email });
    console.log("Admin from DB:", admin);
    if (!admin) {
      console.log("Admin not found");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    console.log("Password match:", isMatch);
    if (!isMatch) {
      console.log("Incorrect password");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Optional: create a JWT token
    const token = jwt.sign({ id: admin._id }, "secretkey", { expiresIn: "1d" });

    return res.status(200).json({ token });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
