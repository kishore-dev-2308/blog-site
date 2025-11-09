import express from "express";
import { auth, authorizeRoles } from "../middleware/authMiddleware.js";
import { body } from "express-validator";
import { editBlog, listBlog, storeBlog, updateBlog } from "../controllers/blogController.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();
router.get('/list', auth, authorizeRoles(1, 2), listBlog);
router.get('/:id', auth, authorizeRoles(1, 2), editBlog);
router.post('/store', auth, upload.single("coverImage"), [
    body("title").notEmpty().withMessage("Title is required"),
], storeBlog);
router.post('/:id', auth, authorizeRoles(1, 2), upload.single("coverImage"), [
    body("title").notEmpty().withMessage("Title is required"),
], updateBlog);

export default router;