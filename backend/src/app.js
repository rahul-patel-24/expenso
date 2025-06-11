import express from 'express';
import expenseRoutes from './routes/expense.routes.js';
import dotenv from 'dotenv';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes.js';
import categoryRoutes from './routes/category.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import './db/pool.js';
import { errorHandler } from './middleware/errorHandler.js';
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cookieParser())
app.use(cors({
  origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173',
  credentials: true
}));

// Error handling middleware
app.use(errorHandler);



// Routes
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/expenses', expenseRoutes);



export default app;
