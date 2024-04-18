import bcrypt from "bcryptjs";
import Admin from "../models/admin.model.js";

export const ChangePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    const email = req.user.email;

    if (newPassword !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "New password and confirm password do not match" });
    }

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      admin.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    admin.password = hashedPassword;

    await admin.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
