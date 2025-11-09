import express from "express";
import { auth, authorizeRoles } from "../middleware/authMiddleware.js";
import { allBolgs } from "../controllers/homeController.js";

const router = express.Router();

router.get('/', allBolgs);

export default router;