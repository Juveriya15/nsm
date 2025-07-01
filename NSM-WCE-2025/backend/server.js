const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const port = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const materialRoutes = require("./routes/materials");
app.use("/api/materials", materialRoutes);

const authRoutes = require("./routes/auth");
app.use("/api/admin", authRoutes);

const adminRoutes = require("./routes/admin");
app.use("/api/admin", adminRoutes);

const coordinatorRoutes = require("./routes/coordinators");
app.use("/api/coordinators", coordinatorRoutes);

const eventPhotoRoutes = require("./routes/eventphotos");
app.use("/api/eventphotos", eventPhotoRoutes);

const importantLinkRoutes = require("./routes/importantlinks");
app.use("/api/importantlinks", importantLinkRoutes);

const sisternodalRoutes = require("./routes/sisternodal");
app.use("/api/sisternodal", sisternodalRoutes);

const eventsRoutes=require("./routes/events")
app.use("/api/events",eventsRoutes)

mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000, 
})
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.error("MongoDB connection error:", err));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
