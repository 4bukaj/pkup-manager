import express from 'express';
import cors from 'cors';
import { config } from './config';
import { authenticate } from './middleware/auth';
import atlassianRoutes from './routes/atlassian';
import geminiRoutes from './routes/gemini';
import reportsRoutes from './routes/reports';

const app = express();

app.use(express.json());
app.use(cors({ origin: config.corsOrigin }));

app.use('/api/atlassian', authenticate, atlassianRoutes);
app.use('/api/gemini', authenticate, geminiRoutes);
app.use('/api/reports', authenticate, reportsRoutes);

app.listen(config.port, () => {
  console.log(`API running on port ${config.port}`);
});
