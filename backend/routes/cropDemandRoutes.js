import express from 'express';
import { getCropDemand, getSchema } from '../controllers/cropDemandController.js';

const router = express.Router();

/**
 * @route   GET /api/crop-projections/schema
 * @desc    Get dataset query parameter schema and supported filter fields
 */
router.get('/schema', getSchema);

/**
 * @route   GET /api/crop-projections
 * @desc    Query crop demand data with filters, pagination, and format
 */
router.get('/', getCropDemand);

/**
 * @route   GET /api/crop-projections/:resourceId
 * @desc    Query specific data.gov.in resource ID with filters
 */
router.get('/:resourceId', getCropDemand);

export default router;
