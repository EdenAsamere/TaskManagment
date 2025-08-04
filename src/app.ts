import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';
import { connectDB } from './config/dbconfig';
import authRoutes from './routes/auth.route';
import projectRoutes from './routes/project.route';
import issueRoutes from './routes/issue.route';
import taskRoutes from './routes/task.route';
import notificationRoutes from './routes/notification.route';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

// Single CORS configuration
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true, // Allow cookies to be sent
}));

// Body parsers
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Handle preflight requests
app.options('*', cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/issues', issueRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/notifications', notificationRoutes);

connectDB();

export default app;