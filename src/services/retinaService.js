/**
 * retinaService.js — Retinal fundus analysis service.
 *
 * Provides the interface between the frontend and the FastAPI retinal
 * analysis endpoints (/retina/...).
 *
 * No real API calls are made in the current frontend-only phase.
 * Stubs are documented to reflect the expected backend contract.
 */

import api from './api';

/**
 * Submit a retinal fundus image for analysis.
 *
 * Backend endpoint: POST /retina/predict
 * Accepts:          multipart/form-data  { file: File }
 * Returns:          { session_id, status, queued_at }
 *
 * @param {File} imageFile - The retinal fundus image (PNG or JPEG)
 * @returns {Promise<object>}
 */
export async function submitRetinaImage(imageFile) {
  const formData = new FormData();
  formData.append('file', imageFile);
  return api.postForm('/retina/predict', formData);
}

/**
 * Poll the status of a retinal analysis session.
 *
 * Backend endpoint: GET /retina/status/:sessionId
 * Returns:          { session_id, status, progress }
 *
 * @param {string} sessionId
 * @returns {Promise<object>}
 */
export async function getRetinaSessionStatus(sessionId) {
  return api.get(`/retina/status/${sessionId}`);
}

/**
 * Retrieve full analysis results for a completed session.
 *
 * Backend endpoint: GET /retina/results/:sessionId
 * Returns:          { session_id, findings, model_version, processed_at }
 *
 * @param {string} sessionId
 * @returns {Promise<object>}
 */
export async function getRetinaResults(sessionId) {
  return api.get(`/retina/results/${sessionId}`);
}

const retinaService = {
  submitRetinaImage,
  getRetinaSessionStatus,
  getRetinaResults,
};

export default retinaService;
