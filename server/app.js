import express from 'express';
import cors from 'cors';
import { requestLogger } from './middleware/requestLogger.js';
import healthRoutes from './routes/healthRoutes.js';
import authRoutes from './routes/authRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import { sendSuccess, sendError } from './utils/response.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.get('/', (req, res) => {
  sendSuccess(res, {
    message: 'SMART WORKSPACE server is running',
    apiBase: '/api'
  });
});

app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);

app.use((req, res) => {
  sendError(res, 'Route not found', 404);
});

export default app;
