import express from 'express';
import { addComment, getComment } from '../controllers/commentController.js';

const router = express.Router();

router.post('/addComment', addComment);
router.get('/getComments', getComment);

export default router;