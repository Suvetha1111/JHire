const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const supabase = require("../config/connectDb");
require("dotenv").config();

const SECRET_KEY = process.env.JWT_SECRET_KEY;

// Login Function
const loginUser = async (req, res) => {
  console.log("Login request received:", req.body);

  const { email, password } = req.body;

  try {
    let user;
    let userType;

    if (email.match(/@(gmail\.com|yahoo\.com|outlook\.com)$/)) {
      userType = "seeker";
      const { data, error } = await supabase
        .from("seeker_table")
        .select("*")
        .eq("email", email)
        .single();

      if (error || !data) return res.status(401).json({ message: "Invalid email or password" });
      user = data;
    } else {
      userType = "hr";
      const { data, error } = await supabase
        .from("hr_table")
        .select("*")
        .eq("email", email)
        .single();

      if (error || !data) return res.status(401).json({ message: "Invalid email or password" });
      user = data;
    }

    // Verify password
    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT Token

    const payload = {
      id: user.seeker_id || user.hr_id,
      email: user.email,
      userType: userType,
      first_name: user.first_name,
      last_name: user.last_name,
      photo_url: user.hr_photo || user.profile_url,
      ...(userType === "hr" && { company_id: user.company_id }), // Add company_id only for HR users
    };
    
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

    const isProduction = process.env.NODE_ENV === "production" && req.hostname !== "localhost";

    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction, 
      sameSite: "Lax",
    });

    console.log("Login Successful:", payload);
    return res.json({ user: payload });
  } catch (error) {
    console.error("Login Error:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

// Check Session Function
const checkSession = (req, res) => {
  try {
    console.log("Cookies Received:", req.cookies); // Debugging log

    const token = req.cookies?.token; // Ensure cookies exist

    if (!token) {
      return res.status(401).json({ message: "No session found" });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid session" });
      }

      console.log("Session Verified:", decoded);
      res.json({ user: decoded, isAuthenticated: true });
    });
  } catch (error) {
    console.error("Check session error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Logout Function
const logoutUser = (req, res) => {
  res.clearCookie("token", { httpOnly: true, sameSite: "Lax", secure: false });
  console.log("User logged out");
  return res.json({ isAuthenticated: false, message: "Logged out successfully" });
};

module.exports = { loginUser, checkSession, logoutUser };
