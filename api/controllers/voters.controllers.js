import bcrypt from "bcryptjs";
import Voters from "../models/voters.model.js";
import Candidates from "../models/candidates.model.js";
import Votes from "../models/votes.model.js";

export const createVoter = async (req, res) => {
  try {
    const {
      email,
      password,
      firstName,
      middleName,
      lastName,
      suffixName,
      organization,
    } = req.body;

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
      organization,
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
  try {
    const { candidateID, email } = req.body;

    // const voterId = req.user.id;

    const existingVoter = await Voters.find({ email });

    if (existingVoter.length === 0) {
      return res.status(404).json({
        success: false,
        message: "You are not registered",
      });
    }
    if (existingVoter[0].status) {
      return res.status(403).json({
        success: false,
        message: "You have already voted",
      });
    }

    if (!candidateID || candidateID.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No candidateID provided",
      });
    }

    const votePromises = candidateID.map(async (id) => {
      const candidate = await Candidates.findById(id);

      if (!candidate) {
        return res.status(404).json({
          success: false,
          message: `Candidate with ID ${id} not found`,
        });
      }

      const newVote = new Votes({
        candidateID: candidate._id,
        voter: existingVoter[0]._id,
        candidate: candidate.fullname,
        position: candidate.position,
      });

      await newVote.save();
      await Candidates.findByIdAndUpdate(candidate._id, {
        $inc: { voteCounts: 1 },
      });

      return newVote._id;
    });

    const voteIDs = await Promise.all(votePromises);

    await Voters.updateOne(
      { email },
      { $set: { status: true, votes: voteIDs } }
    );

    res
      .status(201)
      .json({ success: true, message: "Votes created successfully", voteIDs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to create votes" });
  }
};

export const getAllVoters = async (_, res) => {
  try {
    const allVoters = await Voters.find()
      .select("-password")
      .populate("organization")
      .populate("votes");
    res.status(200).json(allVoters);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch voters" });
  }
};

export const updateVoterOrganization = async (req, res) => {
  const { id } = req.params;
  const { newOrganizationId } = req.body;

  try {
    const voter = await Voters.findById({ googleId: id });

    if (!voter) {
      return res.status(404).json({ message: "Voter not found" });
    }

    voter.organization = newOrganizationId;

    await voter.save();

    return res.status(200).json({
      message: "Organization updated successfully",
      updatedVoter: voter,
    });
  } catch (error) {
    console.error("Error updating organization:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
