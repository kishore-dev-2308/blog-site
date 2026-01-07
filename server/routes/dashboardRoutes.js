import express from "express";
import { auth } from "../middleware/authMiddleware.js";
import { getDashboardstats } from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/stats", auth, getDashboardstats);

export default router;