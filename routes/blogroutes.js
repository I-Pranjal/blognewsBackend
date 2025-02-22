import express from 'express';
import { createBlog, getAllBlogs, getUserBlogs, updateLikes, updateViews } from '../controllers/blogController.js';

const router = express.Router();

router.post('/', createBlog);
router.get('/', getAllBlogs);
router.get('/myblogs', getUserBlogs);
router.post('/:title/like', updateLikes);
router.post('/:title/view', updateViews);

export default router;
