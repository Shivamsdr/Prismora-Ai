/**
 * api.js — Base HTTP client for PRISMORA AI backend.
 *
 * All requests to the FastAPI backend are routed through this module.
 * No real requests are made in the current frontend-only phase.
 *
 * When the backend is available, this client will be extended with:
 * - Request interceptors (auth headers, correlation IDs)
 * - Response interceptors (error normalisation, retry logic)
 * - Timeout handling
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000';

/**
 * Core fetch wrapper.
 *
 * @param {string} endpoint   - Path relative to BASE_URL (e.g. '/chest/predict')
 * @param {RequestInit} options - Standard fetch options
 * @returns {Promise<any>}
 */
async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;

  const defaultHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  const response = await fetch(url, config);

  if (!response.ok) {
    const error = new Error(`API error: ${response.status} ${response.statusText}`);
    error.status = response.status;
    error.url = url;
    throw error;
  }

  // Handle empty responses (204 No Content, etc.)
  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    return null;
  }

  return response.json();
}

// ── Convenience methods ───────────────────────────────────────────

export const api = {
  get:    (endpoint, options = {}) =>
    request(endpoint, { ...options, method: 'GET' }),

  post:   (endpoint, body, options = {}) =>
    request(endpoint, { ...options, method: 'POST', body: JSON.stringify(body) }),

  postForm: (endpoint, formData, options = {}) =>
    request(endpoint, {
      ...options,
      method: 'POST',
      body: formData,
      headers: {
        // Let the browser set Content-Type with multipart boundary
        ...(options.headers ?? {}),
      },
    }),

  put:    (endpoint, body, options = {}) =>
    request(endpoint, { ...options, method: 'PUT', body: JSON.stringify(body) }),

  patch:  (endpoint, body, options = {}) =>
    request(endpoint, { ...options, method: 'PATCH', body: JSON.stringify(body) }),

  delete: (endpoint, options = {}) =>
    request(endpoint, { ...options, method: 'DELETE' }),
};

export { BASE_URL };
export default api;
