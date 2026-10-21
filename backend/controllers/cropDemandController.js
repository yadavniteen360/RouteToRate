import { fetchCropDemandData } from '../services/dataGovService.js';

/**
 * Known schema fields supported by this dataset
 */
export const DATASET_SCHEMA = {
  parameters: {
    'api-key': {
      type: 'string',
      required: true,
      description: 'API Key for data.gov.in (defaults to KISAN_API from server .env)'
    },
    'format': {
      type: 'string',
      default: 'json',
      enum: ['json', 'xml', 'csv'],
      description: 'Output response format'
    },
    'offset': {
      type: 'integer',
      default: 0,
      description: 'Number of records to skip for pagination'
    },
    'limit': {
      type: 'integer',
      default: 10,
      description: 'Maximum number of records to return'
    }
  },
  filters: {
    'document_id': {
      type: 'number',
      description: 'Filters the result with field document_id'
    },
    'crop_group_of_crops': {
      type: 'string',
      description: 'Filters the result with field Crop/Group of Crops (e.g., Rice, Wheat, Pulses)'
    },
    'projected_demand__by_financial_year_2016_17': {
      type: 'number',
      description: 'Filters the result with field Projected Demand by Financial Year 2016-17'
    },
    'projected_demand__by_financial_year_2020_21': {
      type: 'number',
      description: 'Filters the result with field Projected Demand by Financial Year 2020-21'
    },
    'projected_supply__by_financial_year_2016_17': {
      type: 'string',
      description: 'Filters the result with field Projected Supply by Financial Year 2016-17'
    },
    'actual_production__for_financial_year_2006_07': {
      type: 'number',
      description: 'Filters the result with field Actual Production for Financial Year 2006-07'
    },
    'actual_production__for_financial_year_2011_12': {
      type: 'number',
      description: 'Filters the result with field Actual Production for Financial Year 2011-12'
    }
  }
};

/**
 * Controller to get crop demand & projection data
 */
export async function getCropDemand(req, res, next) {
  try {
    const query = req.query;

    // 1. Resolve resource_id from URL params, query string, or .env
    const resourceId =
      req.params.resourceId ||
      query.resource_id ||
      query.resourceId ||
      process.env.DATA_GOV_RESOURCE_ID;

    // 2. Resolve API Key: check request query/header or default to .env KISAN_API
    const apiKey =
      query['api-key'] ||
      query.apiKey ||
      req.headers['x-api-key'] ||
      process.env.KISAN_API;

    // 3. Format, offset, limit with validation
    const format = (query.format || 'json').toLowerCase();
    if (!['json', 'xml', 'csv'].includes(format)) {
      return res.status(400).json({
        error: 'Invalid format parameter. Allowed values: json, xml, csv'
      });
    }

    const offset = Math.max(0, parseInt(query.offset, 10) || 0);
    const limit = Math.max(1, Math.min(parseInt(query.limit, 10) || 10, 1000)); // Cap limit to 1000

    // 4. Extract filters
    // Support both nested query formats:
    // e.g. req.query['filters[crop_group_of_crops]'] OR req.query.filters?.crop_group_of_crops OR direct req.query.crop_group_of_crops
    const filters = {};

    const knownFilterKeys = [
      'document_id',
      'crop_group_of_crops',
      'projected_demand__by_financial_year_2016_17',
      'projected_demand__by_financial_year_2020_21',
      'projected_supply__by_financial_year_2016_17',
      'actual_production__for_financial_year_2006_07',
      'actual_production__for_financial_year_2011_12'
    ];

    // Check nested objects req.query.filters = { crop_group_of_crops: '...' }
    if (query.filters && typeof query.filters === 'object') {
      for (const [k, v] of Object.entries(query.filters)) {
        if (v !== undefined && v !== '') filters[k] = v;
      }
    }

    // Check flat bracket syntax: req.query['filters[crop_group_of_crops]']
    for (const key of Object.keys(query)) {
      const match = key.match(/^filters\[(.*?)\]$/);
      if (match && match[1]) {
        filters[match[1]] = query[key];
      }
    }

    // Check direct query params for ease of use (e.g. ?crop_group_of_crops=Rice)
    for (const key of knownFilterKeys) {
      if (query[key] !== undefined && query[key] !== '' && !filters[key]) {
        filters[key] = query[key];
      }
    }

    // 5. Check if resource_id is present
    if (!resourceId) {
      return res.status(400).json({
        error: 'Missing resource_id',
        message:
          'No resource_id was specified. Provide it as a query param (?resource_id=...), route param (/:resourceId), or set DATA_GOV_RESOURCE_ID in backend/.env',
        availableSchema: DATASET_SCHEMA
      });
    }

    // 6. Fetch from data.gov.in service
    const result = await fetchCropDemandData({
      resourceId,
      apiKey,
      format,
      offset,
      limit,
      filters
    });

    if (result.format === 'json') {
      return res.json({
        status: 'success',
        query: {
          resource_id: resourceId,
          format,
          offset,
          limit,
          filters
        },
        ...result.data
      });
    }

    // Return CSV or XML with appropriate Content-Type
    res.setHeader('Content-Type', result.contentType || (format === 'csv' ? 'text/csv' : 'application/xml'));
    return res.send(result.rawData);
  } catch (error) {
    next(error);
  }
}

/**
 * Controller to get API schema definition and filter documentation
 */
export function getSchema(req, res) {
  res.json({
    status: 'success',
    dataset: 'Crop Demand and Actual Production Projections',
    source: 'data.gov.in Open API',
    schema: DATASET_SCHEMA,
    exampleRequest: {
      endpoint: '/api/crop-projections',
      method: 'GET',
      queryParams: {
        resource_id: 'your_resource_id_here',
        format: 'json',
        limit: 10,
        offset: 0,
        'filters[crop_group_of_crops]': 'Rice',
        'filters[projected_demand__by_financial_year_2016_17]': 110
      }
    }
  });
}
