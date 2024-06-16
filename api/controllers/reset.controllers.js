import Candidates from "../models/candidates.model.js";
import Organization from "../models/organizations.model.js";
import Voters from "../models/voters.model.js";
import Votes from "../models/votes.model.js";

export const ResetSystem = async (req, res) => {
  try {
    await Candidates.deleteMany();
    await Organization.deleteMany();
    await Voters.deleteMany();
    await Votes.deleteMany();
    res.json({
      message: "System has been resetted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
