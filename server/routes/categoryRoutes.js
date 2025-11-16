import express from "express";
import { auth, authorizeRoles } from "../middleware/authMiddleware.js";
import { getCategories } from "../controllers/categoryController.js";

const router = express.Router();

router.get('/get-list', getCategories);

export default router;