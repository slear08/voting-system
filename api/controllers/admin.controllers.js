import Admin from "../models/admin.model.js";
import bcrypt from "bcryptjs";

export const createAdmin = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Check if email domain is "@rtu.edu.ph"
    if (!email.endsWith("g.batstate.edu.ph")) {
      return res.status(400).json({ message: "Invalid email domain" });
    }

    const existingVoter = await Admin.findOne({ email });

    if (existingVoter) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      email,
      password: hashedPassword,
      name,
    });

    await newAdmin.save();

    return res.status(201).json({ message: "Admin created successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
