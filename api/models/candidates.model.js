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
      default: 0,
    },
    platforms: {
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
      ref: "organizations",
    },
  },
  {
    timestamps: true,
  }
);

CandidatesSchema.virtual("fullname").get(function () {
  return `${this.firstName} ${this.middleName} ${this.lastName} ${this.suffixName}`;
});

CandidatesSchema.set("toJSON", { virtuals: true });

const Candidates = mongoose.model("candidate", CandidatesSchema);

export default Candidates;
