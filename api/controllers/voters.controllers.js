import bcrypt from "bcryptjs";
import Voters from "../models/voters.model.js";

export const createVoter = async (req, res) => {
  try {
    const { email, password, firstName, middleName, lastName, suffixName } =
      req.body;

    // Check if email domain is "@rtu.edu.ph"
    if (!email.endsWith("@rtu.edu.ph")) {
      return res.status(400).json({ message: "Invalid email domain" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newVoter = new Voters({
      email,
      password: hashedPassword,
      firstName,
      middleName,
      lastName,
      suffixName,
    });

    await newVoter.save();

    return res.status(201).json({ message: "Voter created successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const markVoterAsVoted = async (req, res) => {
  try {
    const { voterId } = req.params;

    const updatedVoter = await Voters.findByIdAndUpdate(
      voterId,
      { voted: true },
      { new: true }
    );

    if (!updatedVoter) {
      return res.status(404).json({ message: "Voter not found" });
    }

    return res.status(200).json({ message: "Voter has been marked as voted" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
