import { useState, useEffect, useCallback } from 'react';

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png'];
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png'];
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

/**
 * Format bytes into a human-readable string (KB / MB).
 *
 * @param {number} bytes
 * @returns {string}
 */
export function formatFileSize(bytes) {
  if (!Number.isFinite(bytes) || bytes < 0) return '0 B';
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

/**
 * Validate an image file against format and size constraints.
 *
 * @param {File} file
 * @returns {string|null} Error message if invalid, or null if valid.
 */
function validateImageFile(file) {
  if (!file) {
    return 'No file was selected.';
  }

  const nameLower = (file.name || '').toLowerCase();
  const hasValidExtension = ALLOWED_EXTENSIONS.some((ext) => nameLower.endsWith(ext));
  const hasValidMime = ALLOWED_MIME_TYPES.includes(file.type);

  if (!hasValidExtension || (file.type && !hasValidMime)) {
    return 'Unsupported file format. Please select a JPG, JPEG, or PNG image.';
  }

  if (file.size === 0) {
    return 'The selected file is empty. Please choose a valid image.';
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return `File exceeds the 10 MB limit (${formatFileSize(file.size)}). Please select a smaller image.`;
  }

  return null;
}

/**
 * useImageUpload — Reusable hook for medical image selection, validation,
 * preview URL lifecycle management, and cleanup.
 *
 * @returns {object}
 */
export default function useImageUpload() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState(null);

  // Revoke previous object URL on change or unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const selectFile = useCallback((candidateFile) => {
    if (!candidateFile) return false;

    const validationError = validateImageFile(candidateFile);
    if (validationError) {
      setError(validationError);
      return false;
    }

    const nextUrl = URL.createObjectURL(candidateFile);
    setFile(candidateFile);
    setPreviewUrl(nextUrl);
    setError(null);
    return true;
  }, []);

  const removeFile = useCallback(() => {
    setFile(null);
    setPreviewUrl(null);
    setError(null);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    file,
    previewUrl,
    error,
    hasFile: Boolean(file && previewUrl),
    selectFile,
    removeFile,
    clearError,
  };
}
