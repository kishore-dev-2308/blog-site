import express from "express";
import { auth, authorizeRoles } from "../middleware/authMiddleware.js";
import { body } from "express-validator";
import {
  editBlog,
  listBlog,
  storeBlog,
  updateBlog,
  recentBlogs,
  deleteBlog,
  makeFeaturedBlog,
} from "../controllers/blogController.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();
router.get("/list", auth, authorizeRoles(1, 2), listBlog);
router.get("/recent-blogs", auth, authorizeRoles(1, 2), recentBlogs);
router.get("/:id", auth, authorizeRoles(1, 2), editBlog);
router.post("/:id/featured", auth, authorizeRoles(1), makeFeaturedBlog);
router.post(
  "/store",
  auth,
  upload.single("coverImage"),
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("content").notEmpty().withMessage("Content is required"),
    body("categoryId").notEmpty().withMessage("Please select category"),
  ],
  storeBlog,
);
router.post(
  "/:id",
  auth,
  authorizeRoles(1, 2),
  upload.single("coverImage"),
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("content").notEmpty().withMessage("Content is required"),
    body("categoryId").notEmpty().withMessage("Please select category"),
  ],
  updateBlog,
);
router.delete("/:id", auth, authorizeRoles(1, 2), deleteBlog);

export default router;
