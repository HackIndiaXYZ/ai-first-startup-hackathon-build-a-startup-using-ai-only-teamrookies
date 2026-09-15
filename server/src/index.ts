import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import apiRoutes from './routes/api.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

// CORS configuration
app.use(cors({
  origin: [CLIENT_URL, 'http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Mount API routes
app.use('/api', apiRoutes);

// Root route
app.get('/', (_req, res) => {
  res.json({
    message: 'AI COMPANY — Decision Intelligence API Service Running',
    version: '1.0.0',
    docs: '/api/health',
    status: 'online'
  });
});

// Start Server
async function startServer() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`\n======================================================`);
    console.log(`🚀 AI COMPANY Decision Intelligence Server Active`);
    console.log(`📡 URL: http://localhost:${PORT}`);
    console.log(`🛡️ Mode: ${process.env.DEMO_MODE !== 'false' ? 'DEMO & RESILIENT AI AGENT ENGINE' : 'PRODUCTION'}`);
    console.log(`======================================================\n`);
  });
}

startServer().catch(err => {
  console.error('Fatal server startup error:', err);
});
