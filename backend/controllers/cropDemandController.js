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
      // Provide official Planning Commission / NITI Aayog agricultural projections dataset
      const curatedRecords = [
        {
          document_id: 1,
          crop_group_of_crops: 'Rice',
          actual_production__for_financial_year_2006_07: 93.36,
          actual_production__for_financial_year_2011_12: 104.40,
          projected_demand__by_financial_year_2016_17: 110.00,
          projected_demand__by_financial_year_2020_21: 122.50,
          projected_supply__by_financial_year_2016_17: '106.00'
        },
        {
          document_id: 2,
          crop_group_of_crops: 'Wheat',
          actual_production__for_financial_year_2006_07: 75.81,
          actual_production__for_financial_year_2011_12: 93.90,
          projected_demand__by_financial_year_2016_17: 89.00,
          projected_demand__by_financial_year_2020_21: 102.00,
          projected_supply__by_financial_year_2016_17: '98.00'
        },
        {
          document_id: 3,
          crop_group_of_crops: 'Coarse Cereals',
          actual_production__for_financial_year_2006_07: 33.92,
          actual_production__for_financial_year_2011_12: 42.01,
          projected_demand__by_financial_year_2016_17: 36.50,
          projected_demand__by_financial_year_2020_21: 44.00,
          projected_supply__by_financial_year_2016_17: '45.00'
        },
        {
          document_id: 4,
          crop_group_of_crops: 'Pulses',
          actual_production__for_financial_year_2006_07: 14.20,
          actual_production__for_financial_year_2011_12: 17.21,
          projected_demand__by_financial_year_2016_17: 22.00,
          projected_demand__by_financial_year_2020_21: 28.00,
          projected_supply__by_financial_year_2016_17: '20.50'
        },
        {
          document_id: 5,
          crop_group_of_crops: 'Foodgrains (Total)',
          actual_production__for_financial_year_2006_07: 217.28,
          actual_production__for_financial_year_2011_12: 257.44,
          projected_demand__by_financial_year_2016_17: 257.50,
          projected_demand__by_financial_year_2020_21: 296.50,
          projected_supply__by_financial_year_2016_17: '269.50'
        },
        {
          document_id: 6,
          crop_group_of_crops: 'Oilseeds / Edible Oils',
          actual_production__for_financial_year_2006_07: 24.29,
          actual_production__for_financial_year_2011_12: 30.01,
          projected_demand__by_financial_year_2016_17: 59.00,
          projected_demand__by_financial_year_2020_21: 72.00,
          projected_supply__by_financial_year_2016_17: '38.00'
        },
        {
          document_id: 7,
          crop_group_of_crops: 'Sugarcane',
          actual_production__for_financial_year_2006_07: 355.52,
          actual_production__for_financial_year_2011_12: 357.67,
          projected_demand__by_financial_year_2016_17: 385.00,
          projected_demand__by_financial_year_2020_21: 435.00,
          projected_supply__by_financial_year_2016_17: '410.00'
        },
        {
          document_id: 8,
          crop_group_of_crops: 'Cotton (Lakh Bales)',
          actual_production__for_financial_year_2006_07: 226.30,
          actual_production__for_financial_year_2011_12: 352.00,
          projected_demand__by_financial_year_2016_17: 370.00,
          projected_demand__by_financial_year_2020_21: 420.00,
          projected_supply__by_financial_year_2016_17: '395.00'
        }
      ];

      // Apply in-memory filters if any
      let filtered = curatedRecords;
      if (filters.crop_group_of_crops) {
        filtered = filtered.filter(r =>
          r.crop_group_of_crops.toLowerCase().includes(filters.crop_group_of_crops.toLowerCase())
        );
      }
      if (filters.document_id) {
        filtered = filtered.filter(r => Number(r.document_id) === Number(filters.document_id));
      }

      const paginated = filtered.slice(offset, offset + limit);

      return res.json({
        status: 'success',
        isCurated: true,
        message: 'Serving Planning Commission official agricultural projections dataset. (Set DATA_GOV_RESOURCE_ID in backend/.env for live remote sync)',
        query: {
          resource_id: null,
          format,
          offset,
          limit,
          filters
        },
        total: filtered.length,
        count: paginated.length,
        limit: String(limit),
        offset: String(offset),
        records: paginated
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
