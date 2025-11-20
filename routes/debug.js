import express from "express";
import Enrollment from "../models/Enrollment.js";

const router = express.Router();

router.get("/enrollments-all", async (req, res) => {
  const all = await Enrollment.find();
  res.json(all);
});

export default router;
