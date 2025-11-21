import express from "express";
import {
  getAdminSummary,
  getAllUsers,
  getAllEnrollments,
} from "../controllers/adminController.js";
import { protect, verifyAdmin } from "../middleware/auth.js";

const router = express.Router();

router.get("/summary", protect, verifyAdmin, getAdminSummary);
router.get("/users", protect, verifyAdmin, getAllUsers);
router.get("/enrollments", protect, verifyAdmin, getAllEnrollments);

export default router;
