// backend/routes/courseRoutes.js
import express from "express";
import {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/courseController.js";
import { protect, verifyAdmin } from "../middleware/auth.js";

const router = express.Router();

// Public
router.get("/", getAllCourses);
router.get("/:id", getCourseById);

// Admin-only
router.post("/", protect, verifyAdmin, createCourse);
router.put("/:id", protect, verifyAdmin, updateCourse);
router.delete("/:id", protect, verifyAdmin, deleteCourse);

export default router;
