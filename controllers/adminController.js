import Course from "../models/Course.js";
import Enrollment from "../models/Enrollment.js";
import User from "../models/User.js";

// GET /api/admin/summary
export const getAdminSummary = async (req, res) => {
  try {
    const [totalCourses, totalEnrollments, totalUsers] = await Promise.all([
      Course.countDocuments(),
      Enrollment.countDocuments(),
      User.countDocuments(),
    ]);

    res.json({ totalCourses, totalEnrollments, totalUsers });
  } catch (err) {
    console.error("getAdminSummary error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// GET /api/admin/users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    console.error("getAllUsers error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// GET /api/admin/enrollments
export const getAllEnrollments = async (req, res) => {
  try {
    const [enrollments, courses] = await Promise.all([
      Enrollment.find().sort({ createdAt: -1 }),
      Course.find(),
    ]);

    const courseMap = new Map(
      courses.map((c) => [String(c._id), c])
    );

    const result = enrollments.map((e) => ({
      ...e.toObject(),
      courseTitle: courseMap.get(e.course)?.title || e.course,
    }));

    res.json(result);
  } catch (err) {
    console.error("getAllEnrollments error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
