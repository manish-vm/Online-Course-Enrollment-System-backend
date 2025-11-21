import Enrollment from "../models/Enrollment.js";

// POST /api/enroll
export const enrollCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userEmail = req.user?.email;

    if (!courseId) {
      return res.status(400).json({ error: "courseId is required" });
    }
    if (!userEmail) {
      return res
        .status(401)
        .json({ error: "User email missing from token" });
    }

    // Avoid duplicate
    const existing = await Enrollment.findOne({ course: courseId, userEmail });
    if (existing) {
      return res.status(409).json({
        message: "Already enrolled",
        enrollment: existing,
      });
    }

    const enrollment = await Enrollment.create({
      course: courseId,
      userEmail,
    });

    return res.status(201).json({
      message: "Enrolled",
      enrollment,
    });
  } catch (err) {
    console.error("enrollCourse error:", err);
    return res.status(500).json({ error: "Server Error" });
  }
};

// GET /api/enroll – current user's enrollments
export const getEnrollments = async (req, res) => {
  try {
    const userEmail = req.user?.email;

    if (!userEmail) {
      return res
        .status(401)
        .json({ error: "User email missing from token" });
    }

    const enrollments = await Enrollment.find({ userEmail }).sort({
      createdAt: -1,
    });

    return res.json(enrollments);
  } catch (err) {
    console.error("getEnrollments error:", err);
    return res.status(500).json({ error: "Server Error" });
  }
};

// DELETE /api/enroll/:id
export const removeEnrollment = async (req, res) => {
  try {
    const deleted = await Enrollment.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Enrollment not found" });
    }

    return res.json({ message: "Enrollment removed" });
  } catch (err) {
    console.error("removeEnrollment error:", err);
    return res.status(500).json({ error: "Server Error" });
  }
};
