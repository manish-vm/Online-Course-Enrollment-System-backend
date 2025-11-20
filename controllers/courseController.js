import Course from "../models/Course.js";
import defaultCourses from "../data/defaultCourses.js";

// GET /api/courses  – public
export const getAllCourses = async (req, res) => {
  try {
    let courses = await Course.find().sort({ createdAt: -1 });

    // Seed DB with default courses if empty
    if (courses.length === 0) {
      await Course.insertMany(defaultCourses);
      courses = await Course.find().sort({ createdAt: -1 });
    }

    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/courses/:id  – public
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ error: "Course not found" });
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/courses  – admin only
export const createCourse = async (req, res) => {
  try {
    const {
      title,
      description,
      platform,
      price,
      oldPrice,
      rating,
      ratingsCount,
      badge,
      category,
      thumbnail,
    } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ error: "Title and description are required" });
    }

    const course = await Course.create({
      title,
      description,
      platform: platform || "Online",
      price: price || "Free",
      oldPrice: oldPrice || "",
      rating: rating ?? 0,
      ratingsCount: ratingsCount ?? 0,
      badge: badge || "",
      category: category || "General",
      thumbnail:
        thumbnail ||
        "https://via.placeholder.com/400x250.png?text=Course+Thumbnail",
    });

    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /api/courses/:id – admin only
export const updateCourse = async (req, res) => {
  try {
    const updated = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /api/courses/:id – admin only
export const deleteCourse = async (req, res) => {
  try {
    const deleted = await Course.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.json({ message: "Course deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
