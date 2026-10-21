import express from 'express';
import { getMandiPrices, getRouteToRateAdvice } from '../controllers/mandiController.js';

const router = express.Router();

// GET /api/mandi-prices
router.get('/', getMandiPrices);

// POST /api/mandi-prices/advisor
router.post('/advisor', getRouteToRateAdvice);
router.post('/advice', getRouteToRateAdvice);

export default router;
