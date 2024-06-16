import mongoose from "mongoose";

const OrganizationSchema = new mongoose.Schema(
  {
    picture: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    info: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Organization = mongoose.model("organizations", OrganizationSchema);

export default Organization;
