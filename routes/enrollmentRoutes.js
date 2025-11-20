// backend/routes/enrollmentRoutes.js
import express from "express";
import {
  enrollCourse,
  getEnrollments,
  removeEnrollment,
} from "../controllers/enrollmentController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/", protect, enrollCourse);
router.get("/", protect, getEnrollments);
router.delete("/:id", protect, removeEnrollment);

export default router;
