import express from "express";
import { body } from "express-validator";
import { auth, authorizeRoles } from "../middleware/authMiddleware.js";
import { getAllUsers, updateUserStatus} from "../controllers/userController.js";

const router = express.Router();

router.get("/get-list", auth, authorizeRoles(1), getAllUsers);
router.put("/update-status/:id", auth, authorizeRoles(1), updateUserStatus);

export default router;