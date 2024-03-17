import mongoose from "mongoose";

const CandidatesSchema = new mongoose.Schema(
  {
    profile: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
    },
    lastName: {
      type: String,
      required: true,
    },
    suffixName: {
      type: String,
    },
    voteCounts: {
      type: Number,
      required: true,
    },
    platform: {
      type: [
        new mongoose.Schema(
          {
            title: String,
            info: String,
          },
          { _id: false }
        ),
      ],
      required: true,
    },
    achievements: {
      type: [
        new mongoose.Schema(
          {
            title: String,
            info: String,
          },
          { _id: false }
        ),
      ],
    },
    position: {
      type: String,
      required: true,
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "organization",
    },
  },
  {
    timestamps: true,
  }
);

const Candidates = mongoose.model("candidate", CandidatesSchema);

export default Candidates;
