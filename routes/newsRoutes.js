import {latestpost, homeallnews, homebusinessnews, homeentertainmentnews, homesportsnews, hometechnologynews} from '../controllers/newsController.js';
import express from 'express';

const router = express.Router();

router.get('/latestpost', latestpost);
router.get('/homeallnews', homeallnews);
router.get('/homebusinessnews', homebusinessnews);
router.get('/homeentertainmentnews', homeentertainmentnews);
router.get('/homesportsnews', homesportsnews);
router.get('/hometechnologynews', hometechnologynews);


export default router;
