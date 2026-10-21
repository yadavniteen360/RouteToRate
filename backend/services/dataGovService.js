const DATA_GOV_BASE_URL = 'https://api.data.gov.in/resource';

/**
 * Service to interact with data.gov.in Open Government Data (OGD) API
 */
export async function fetchCropDemandData({
  resourceId,
  apiKey,
  format = 'json',
  offset = 0,
  limit = 10,
  filters = {}
}) {
  if (!resourceId) {
    throw new Error(
      'Missing resource_id. Please specify resource_id in query parameters or set DATA_GOV_RESOURCE_ID in your .env file.'
    );
  }

  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please provide api-key in query or set KISAN_API in your .env file.'
    );
  }

  // Construct target URL with query params
  const url = new URL(`${DATA_GOV_BASE_URL}/${resourceId}`);
  url.searchParams.append('api-key', apiKey);
  url.searchParams.append('format', format);
  url.searchParams.append('offset', String(offset));
  url.searchParams.append('limit', String(limit));

  // Append filters to query parameters (format: filters[key]=value)
  for (const [key, value] of Object.entries(filters)) {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.append(`filters[${key}]`, String(value));
    }
  }

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'Accept': format === 'json' ? 'application/json' : '*/*'
    }
  });

  const contentType = response.headers.get('content-type') || '';

  if (!response.ok) {
    let errorDetail = response.statusText;
    try {
      if (contentType.includes('application/json')) {
        const errorJson = await response.json();
        errorDetail = errorJson.message || errorJson.error || JSON.stringify(errorJson);
      } else {
        errorDetail = await response.text();
      }
    } catch {
      // fallback to statusText
    }
    const error = new Error(`Data.gov.in API Error (${response.status}): ${errorDetail}`);
    error.status = response.status;
    throw error;
  }

  if (format === 'json' || contentType.includes('application/json')) {
    const data = await response.json();
    return {
      success: true,
      format: 'json',
      data
    };
  }

  // Handle CSV, XML or plain text
  const rawText = await response.text();
  return {
    success: true,
    format,
    contentType,
    rawData: rawText
  };
}
