import { AlertCircle, X } from 'lucide-react';

/**
 * UploadError — Displays file validation or upload errors in an editorial alert.
 */
export default function UploadError({ message, onDismiss }) {
  if (!message) return null;

  return (
    <div
      role="alert"
      className="flex items-start justify-between gap-3 px-4 py-3 rounded-md border border-red-200 bg-red-50 text-red-800"
    >
      <div className="flex items-start gap-2.5">
        <AlertCircle size={16} className="shrink-0 mt-0.5 text-red-600" aria-hidden="true" />
        <div className="flex flex-col gap-0.5">
          <span className="text-xs font-semibold tracking-tight text-red-900">
            Validation Error
          </span>
          <p className="text-xs leading-relaxed text-red-700">
            {message}
          </p>
        </div>
      </div>

      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss error"
          className="p-1 rounded text-red-500 hover:text-red-800 hover:bg-red-100 transition-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
