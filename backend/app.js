const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const seekerRoutes = require("./routes/seekerRoutes");
const hrRoutes = require("./routes/hrRoutes");
const jobRoutes = require("./routes/jobRoutes");
const authRoutes = require("./routes/authRoutes");
const companyRoutes = require("./routes/companyRoutes");

const app = express();

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json({ limit: "50mb" })); 
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use("/jhire/seeker", seekerRoutes);
app.use("/jhire/hr", hrRoutes);
app.use("/jhire/jobs", jobRoutes);
app.use('/jhire/auth', authRoutes);
app.use('/jhire/companies', companyRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to JHire");
});
app.get("/jhire", (req, res) => {
  res.send("Welcome to JHire Home Page");
});

module.exports = app;
