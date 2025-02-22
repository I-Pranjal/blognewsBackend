import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import blogRoutes from './routes/blogroutes.js';
// import categoryRoutes from './routes/categoryRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Database Connection
import connectDB from './config/db.js';
connectDB();

// Routes
app.use('/api/blogs', blogRoutes);
app.use('/api', userRoutes);
// app.use('/api/categories', categoryRoutes);
app.use('/api', commentRoutes);
app.use('/api', notificationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
