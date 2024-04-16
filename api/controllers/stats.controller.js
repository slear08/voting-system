import Voters from "../models/voters.model.js";

const GetStats = async (req, res) => {
  try {
    const totalVoters = await Voters.countDocuments();

    const totalVoted = await Voters.countDocuments({ status: true });

    res.json({
      totalVoters,
      totalVoted,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { GetStats };
