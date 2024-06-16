import mongoose from "mongoose";

const VotersSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    googleId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    profile: { type: String },
    status: {
      type: Boolean,
      default: false,
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "organizations",
    },
    votes: [{ type: mongoose.Schema.Types.ObjectId, ref: "votes" }],
  },
  {
    timestamps: true,
  }
);

const Voters = mongoose.model("voters", VotersSchema);

export default Voters;
