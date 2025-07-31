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
dotenv.config();

const app = express();

app.use(cors());

// Body parsers first
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes after middleware
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/issues', issueRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/notifications', notificationRoutes);

connectDB();

export default app;
