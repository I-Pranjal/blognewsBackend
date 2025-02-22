import express from 'express';
import { addUser, signIn, googleSignIn, subscribeMail, getStats } from '../controllers/userController.js';

const router = express.Router();

router.post('/signup', addUser);
router.post('/signin', signIn);
router.post('/auth/google', googleSignIn);
router.post('/sendMail', subscribeMail);
router.get('/stats', getStats);

export default router;