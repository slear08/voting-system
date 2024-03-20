import mongoose from "mongoose";

const VotersSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
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
    status: {
      type: Boolean,
      default: false,
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "organizations",
      required: true,
    },
    votes: [{ type: mongoose.Schema.Types.ObjectId, ref: "votes" }],
  },
  {
    timestamps: true,
  }
);

VotersSchema.virtual("fullname").get(function () {
  return `${this.firstName} ${this.middleName} ${this.lastName} ${this.suffixName}`;
});

VotersSchema.set("toJSON", { virtuals: true });

const Voters = mongoose.model("voters", VotersSchema);

export default Voters;
