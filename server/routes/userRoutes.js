import express from "express";
import { body } from "express-validator";
import { auth } from "../middleware/authMiddleware.js";
import { getProfile, updateProfile } from "../controllers/userController.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/", auth, getProfile);
router.post("/update", auth, upload.single("profileImage"), [
    body("name").notEmpty().withMessage("Name is required"),
], updateProfile);

export default router;