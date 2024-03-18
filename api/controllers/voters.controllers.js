import bcrypt from "bcryptjs";
import Voters from "../models/voters.model.js";
import Candidates from "../models/candidates.model.js";
import Votes from "../models/votes.model.js";

export const createVoter = async (req, res) => {
  try {
    const { email, password, firstName, middleName, lastName, suffixName } =
      req.body;

    // Check if email domain is "@rtu.edu.ph"
    if (!email.endsWith("g.batstate.edu.ph")) {
      return res.status(400).json({ message: "Invalid email domain" });
    }

    // Check if the email already exists in the database
    const existingVoter = await Voters.findOne({ email });
    if (existingVoter) {
      return res.status(400).json({ message: "Email already exists" });
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

export const createVote = async (req, res) => {
  const { candidateID } = req.body;

  const voterId = req.user._id;

  try {
    const votePromises = candidateID.map(async (id) => {
      const candidate = await Candidates.findById(id);

      if (!candidate) {
        res
          .status(404)
          .json({
            success: false,
            message: `Candidate with ID ${id} not found`,
          });
      }

      const newVote = new Votes({
        candidateID: candidate._id,
        voter: voterId,
        position: candidate.position,
        fullname: candidate.fullname,
      });

      await newVote.save();
      await Candidates.findByIdAndUpdate(candidate._id, {
        $inc: { voteCounts: 1 },
      });

      return newVote._id;
    });

    const voteIDs = await Promise.all(votePromises);

    await Voters.findByIdAndUpdate(voterId, {
      $set: { status: true },
      $push: { votes: { $each: [voteIDs] } },
    });

    res
      .status(201)
      .json({ success: true, message: "Votes created successfully", voteIDs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to create votes" });
  }
};
