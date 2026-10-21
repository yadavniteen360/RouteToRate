import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cropDemandRoutes from './routes/cropDemandRoutes.js';

import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables from backend/.env
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '.env') });
dotenv.config(); // fallback to cwd if applicable

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    app: 'RouteToRate',
    tagline: 'Deduct round-trip fuel & transport — see which mandi delivers the highest net take-home profit.',
    timestamp: new Date().toISOString()
  });
});

import mandiRoutes from './routes/mandiRoutes.js';

// Mandi and Projections routes
app.use('/api/crop-projections', cropDemandRoutes);
app.use('/api/crop-demand', cropDemandRoutes);
app.use('/api/mandi-prices', mandiRoutes);
app.use('/api/ai', mandiRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    app: 'RouteToRate API',
    tagline: 'Deduct round-trip fuel & transport — see which mandi delivers the highest net take-home profit.',
    version: '1.0.0',
    documentation: '/api/crop-projections/schema',
    endpoints: {
      health: '/api/health',
      mandiPrices: '/api/mandi-prices',
      cropProjections: '/api/crop-projections',
      schema: '/api/crop-projections/schema'
    }
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found',
    requestedUrl: req.originalUrl
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[API Error]:', err.message);
  const status = err.status || 500;
  res.status(status).json({
    error: err.message || 'Internal Server Error',
    status
  });
});

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  app.listen(PORT, () => {
    console.log(`🌾 RouteToRate Server running on http://localhost:${PORT}`);
    console.log(`📊 Schema & Docs: http://localhost:${PORT}/api/crop-projections/schema`);
  });
}

export default app;
