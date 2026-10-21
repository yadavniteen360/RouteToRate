/**
 * RouteToRate Frontend Configuration
 * Manages API endpoints with environment variable fallback.
 */

const rawUrl =
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_API_BASE_URL ||
  '';

// Normalize by stripping any trailing slash
export const API_BASE_URL = rawUrl.replace(/\/+$/, '');

/**
 * Returns full API URL for a given endpoint.
 * Example: getApiUrl('/api/mandi-prices') -> 'https://route-to-rate.vercel.app/api/mandi-prices'
 */
export function getApiUrl(endpoint = '') {
  if (!endpoint) return API_BASE_URL;
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${API_BASE_URL}${cleanEndpoint}`;
}
