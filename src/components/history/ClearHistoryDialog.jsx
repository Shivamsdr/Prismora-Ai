import { useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';

/**
 * ClearHistoryDialog — Accessible confirmation dialog before wiping all
 * locally stored analysis history records.
 */
export default function ClearHistoryDialog({
  open,
  recordCount,
  onConfirm,
  onCancel,
}) {
  useEffect(() => {
    if (!open) return;

    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        onCancel();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-modal flex items-center justify-center p-4 bg-navy-950/40 backdrop-blur-[1px]"
      role="presentation"
      onClick={onCancel}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="clear-history-title"
        aria-describedby="clear-history-desc"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-xl border border-neutral-200 bg-white shadow-lg overflow-hidden"
      >
        <div className="flex items-start justify-between gap-3 px-5 py-4 border-b border-neutral-200 bg-neutral-50">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-red-50 border border-red-200 text-red-600">
              <AlertTriangle size={16} aria-hidden="true" />
            </div>
            <h2
              id="clear-history-title"
              className="text-sm font-bold text-navy-600"
            >
              Clear Local Analysis History
            </h2>
          </div>

          <button
            type="button"
            onClick={onCancel}
            aria-label="Close confirmation dialog"
            className="p-1 rounded text-neutral-500 hover:text-neutral-900 hover:bg-neutral-200/70 transition-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
          >
            <X size={15} />
          </button>
        </div>

        <div className="px-5 py-4">
          <p
            id="clear-history-desc"
            className="text-xs sm:text-sm text-neutral-700 leading-relaxed"
          >
            This will permanently remove all{' '}
            <strong className="font-semibold text-navy-600">{recordCount}</strong>{' '}
            locally stored analysis record{recordCount === 1 ? '' : 's'} from this browser&apos;s
            IndexedDB storage. This action cannot be undone.
          </p>
        </div>

        <div className="flex items-center justify-end gap-2.5 px-5 py-3.5 border-t border-neutral-200 bg-neutral-50">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-md text-xs font-medium border border-neutral-300 bg-white text-neutral-700 hover:border-neutral-400 transition-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 rounded-md text-xs font-semibold bg-red-600 text-white hover:bg-red-700 transition-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
          >
            Clear all records
          </button>
        </div>
      </div>
    </div>
  );
}
