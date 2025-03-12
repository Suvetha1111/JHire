const bcrypt = require("bcryptjs");
const supabase = require("../config/connectDb");

const updatePassword = async (req, res) => {
  console.log("Password update request received:", req.body);

  const { email, newPassword } = req.body;

  try {
    let user;
    let table;
    let idField;

    if (email.match(/@(gmail\.com|yahoo\.com|outlook\.com)$/)) {
      table = "seeker_table";
      idField = "seeker_id";
    } else {
      table = "hr_table";
      idField = "hr_id";
    }

    // Check if user exists
    const { data, error } = await supabase.from(table).select("*").eq("email", email).single();
    if (error || !data) {
      return res.status(404).json({ message: "User not found" });
    }
    user = data;

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password in the database
    const { error: updateError } = await supabase
      .from(table)
      .update({ password_hash: hashedPassword })
      .eq(idField, user[idField]);

    if (updateError) {
      throw new Error(updateError.message);
    }

    console.log("Password updated successfully for:", email);
    return res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Password update error:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { updatePassword };
