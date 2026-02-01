import express from "express";
import { auth, authorizeRoles } from "../middleware/authMiddleware.js";
import { getAllRequests, updateRequestStatus } from "../controllers/authorRequestController.js";

const router = express.Router();

router.get("/", auth, authorizeRoles(1), getAllRequests);
router.post("/:id", auth, authorizeRoles(1), updateRequestStatus);

export default router;