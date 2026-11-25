/**
 * chestService.js — Chest X-ray analysis service.
 *
 * Provides the interface between the frontend and the FastAPI chest
 * analysis endpoints (/chest/...).
 *
 * No real API calls are made in the current frontend-only phase.
 * Stubs are documented to reflect the expected backend contract.
 */

import api from './api';

/**
 * Submit a chest X-ray image for analysis.
 *
 * Backend endpoint: POST /chest/predict
 * Accepts:          multipart/form-data  { file: File }
 * Returns:          { session_id, status, queued_at }
 *
 * @param {File} imageFile - The chest radiograph file (DICOM, PNG, or JPEG)
 * @returns {Promise<object>}
 */
export async function submitChestImage(imageFile) {
  const formData = new FormData();
  formData.append('file', imageFile);
  return api.postForm('/chest/predict', formData);
}

/**
 * Poll the status of a chest analysis session.
 *
 * Backend endpoint: GET /chest/status/:sessionId
 * Returns:          { session_id, status, progress }
 *
 * @param {string} sessionId
 * @returns {Promise<object>}
 */
export async function getChestSessionStatus(sessionId) {
  return api.get(`/chest/status/${sessionId}`);
}

/**
 * Retrieve full analysis results for a completed session.
 *
 * Backend endpoint: GET /chest/results/:sessionId
 * Returns:          { session_id, findings, model_version, processed_at }
 *
 * @param {string} sessionId
 * @returns {Promise<object>}
 */
export async function getChestResults(sessionId) {
  return api.get(`/chest/results/${sessionId}`);
}

const chestService = {
  submitChestImage,
  getChestSessionStatus,
  getChestResults,
};

export default chestService;
