import {latestpost} from '../controllers/newsController.js';
import express from 'express';

const router = express.Router();

router.get('/latestpost', latestpost);

export default router;
