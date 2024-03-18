import mongoose from "mongoose";

const VotesSchema = new mongoose.Schema(
  {
    candidateID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "candidates",
      required: true,
    },
    voter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "voters",
      required: true,
    },
    candidate: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Votes = mongoose.model("votes", VotesSchema);

export default Votes;
