import express from "express";
import { auth, authorizeRoles } from "../middleware/authMiddleware.js";
import { allBolgs, getBlogByCategory, getBySlug, latestBlogs, userAuthorRequest } from "../controllers/homeController.js";

const router = express.Router();

router.get('/', allBolgs);
router.get('/get-by-slug/:slug', getBySlug);
router.get('/latest', latestBlogs);
router.get('/get-by-category', getBlogByCategory);
router.post('/author-request', auth, authorizeRoles(3), userAuthorRequest)

export default router;