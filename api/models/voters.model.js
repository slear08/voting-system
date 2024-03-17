import mongoose from "mongoose";

const VotersSchema = new mongoose.Schema(
  {
    email: {
      type: String,
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
    voted: {
      type: Boolean,
      required: true,
      default: false,
    },
    votes: [{ type: mongoose.Schema.Types.Mixed, required: true }],
  },
  {
    timestamps: true,
  }
);

VotersSchema.virtual("fullname").get(function () {
  return `${this.firstName} ${this.middleName} ${this.lastName} ${this.suffixName}`;
});

VotersSchema.set("toJSON", { virtuals: true });

const Voters = mongoose.model("voter", VotersSchema);

export default Voters;
