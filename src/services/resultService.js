/**
 * resultService.js — Validation and normalization for medical analysis results.
 *
 * Prepared for future integration with the FastAPI + PyTorch backend.
 * Does NOT make network requests or generate fake predictions.
 */

export const CHEST_CLASSES = ['Normal', 'Pneumonia'];

export const RETINAL_GRADES = [
  'Grade 0: No DR',
  'Grade 1: Mild DR',
  'Grade 2: Moderate DR',
  'Grade 3: Severe DR',
  'Grade 4: Proliferative DR',
];

/**
 * Format a confidence score (0..1 or 0..100) into a 0..100 number.
 * Returns null if unavailable or invalid.
 *
 * @param {number|null|undefined} value
 * @returns {number|null}
 */
export function normalizeConfidence(value) {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    return null;
  }
  const pct = value <= 1 && value >= 0 ? value * 100 : value;
  if (pct < 0 || pct > 100) return null;
  return Number(pct.toFixed(1));
}

/**
 * Validate that a backend response contains the minimum required fields
 * for a genuine analysis result.
 *
 * @param {object} payload
 * @returns {{ valid: boolean, reason?: string }}
 */
export function validateBackendResult(payload) {
  if (!payload || typeof payload !== 'object') {
    return { valid: false, reason: 'Result payload is empty or invalid.' };
  }

  const modality = payload.modality;
  if (modality !== 'chest' && modality !== 'retina') {
    return { valid: false, reason: 'Unsupported or missing imaging modality.' };
  }

  const status = payload.predictionStatus ?? payload.prediction_status;
  if (status !== 'accepted' && status !== 'abstained') {
    return { valid: false, reason: 'Missing valid prediction status (accepted or abstained).' };
  }

  if (status === 'accepted' && !payload.prediction) {
    return { valid: false, reason: 'Accepted result is missing a prediction label.' };
  }

  return { valid: true };
}

/**
 * Normalize a genuine backend analysis response into a consistent
 * frontend shape for the Results interface.
 *
 * @param {object} payload
 * @returns {object|null}
 */
export function normalizeAnalysisResult(payload) {
  const check = validateBackendResult(payload);
  if (!check.valid) return null;

  const predictionStatus = payload.predictionStatus ?? payload.prediction_status;
  const id = payload.id ?? payload.sessionId ?? payload.session_id ?? null;

  return {
    id,
    sessionId: id,
    modality: payload.modality,
    title:
      payload.title ??
      (payload.modality === 'chest'
        ? 'Chest X-ray Analysis'
        : 'Retinal Fundus Analysis'),
    createdAt: payload.createdAt ?? payload.created_at ?? payload.processed_at ?? null,
    predictionStatus,
    prediction: predictionStatus === 'accepted' ? payload.prediction : null,
    confidence: normalizeConfidence(payload.confidence),
    modelName: payload.modelName ?? payload.model_name ?? null,
    modelVersion: payload.modelVersion ?? payload.model_version ?? null,
    filename: payload.filename ?? null,
    analysisMetadata: payload.analysisMetadata ?? payload.metadata ?? null,
    originalImageUrl: payload.originalImageUrl ?? payload.original_image_url ?? null,
    gradCamUrl: payload.gradCamUrl ?? payload.gradcam_url ?? null,
    overlayUrl: payload.overlayUrl ?? payload.overlay_url ?? null,
    gradCamAvailable: Boolean(
      payload.gradCamAvailable ?? payload.gradCamUrl ?? payload.gradcam_url
    ),
  };
}

/**
 * Convert a normalized completed result into a lightweight metadata record
 * for IndexedDB storage. Excludes image URLs/blobs so medical images are not
 * permanently stored by default.
 *
 * @param {object} normalizedResult
 * @returns {object|null}
 */
export function toHistoryRecord(normalizedResult) {
  if (!normalizedResult || !normalizedResult.id) return null;

  return {
    id: normalizedResult.id,
    sessionId: normalizedResult.id,
    createdAt: normalizedResult.createdAt ?? new Date().toISOString(),
    modality: normalizedResult.modality,
    filename: normalizedResult.filename ?? null,
    prediction: normalizedResult.prediction ?? null,
    predictionStatus: normalizedResult.predictionStatus,
    status: normalizedResult.predictionStatus === 'abstained' ? 'abstained' : 'complete',
    confidence: normalizedResult.confidence ?? null,
    modelName: normalizedResult.modelName ?? null,
    modelVersion: normalizedResult.modelVersion ?? null,
    analysisMetadata: normalizedResult.analysisMetadata ?? null,
    gradCamAvailable: Boolean(normalizedResult.gradCamAvailable),
  };
}

const resultService = {
  CHEST_CLASSES,
  RETINAL_GRADES,
  normalizeConfidence,
  validateBackendResult,
  normalizeAnalysisResult,
  toHistoryRecord,
};

export default resultService;
