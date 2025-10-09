import express, { Express, Request, Response } from 'express';
import { connectDB } from './dbConfig.js'; 
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import taskRoutes from './routes/taskRoutes.js'
import organizationRoutes from './routes/organizationRoutes.js'
import leadRoutes from './routes/leadRoutes.js'
import './models/UserModel.js'; 
import './models/RoleSchema.js';
import './models/Permissions.js'; 
import cors from 'cors';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;

connectDB();

const corsOptions = {
    origin: 'http://localhost:3000', 
    credentials: true, 
};

app.use(cors(corsOptions)); 

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }))

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/orgs', organizationRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});