import mongoose from "mongoose";

const EnrollmentSchema = new mongoose.Schema(
  {
    course: {
      type: String, // Course _id as string
      required: true,
    },
    userEmail: {
      type: String, // user email from token
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Enrollment", EnrollmentSchema);
