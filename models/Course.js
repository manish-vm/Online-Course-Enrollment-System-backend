import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    platform: { type: String, default: "Online" },
    price: { type: String, default: "Free" },
    oldPrice: { type: String, default: "" },
    rating: { type: Number, default: 0 },
    ratingsCount: { type: Number, default: 0 },
    badge: { type: String, default: "" },
    category: { type: String, default: "General" },
    thumbnail: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Course", CourseSchema);
