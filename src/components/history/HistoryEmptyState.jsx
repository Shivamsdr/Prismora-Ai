import { Link } from 'react-router-dom';
import { FileSearch, ArrowRight } from 'lucide-react';

/**
 * HistoryEmptyState — Displayed when no local analyses exist or when a
 * modality filter matches zero records.
 */
export default function HistoryEmptyState({ isFiltered, activeFilter, onResetFilter }) {
  if (isFiltered) {
    const label = activeFilter === 'chest' ? 'Chest X-ray' : 'Retinal Fundus';
    return (
      <div className="flex flex-col items-center justify-center text-center py-14 px-6 gap-3">
        <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-neutral-100 text-neutral-400">
          <FileSearch size={20} aria-hidden="true" />
        </div>
        <p className="text-sm font-semibold text-neutral-900">
          No {label} analyses recorded.
        </p>
        <p className="text-xs text-neutral-600 max-w-sm leading-relaxed">
          There are no locally stored records matching the selected modality filter.
        </p>
        <button
          type="button"
          onClick={onResetFilter}
          className="mt-1 inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-xs font-medium border border-neutral-300 bg-white text-neutral-700 hover:border-teal-600 hover:text-teal-700 transition-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
        >
          Show all modalities
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6 gap-4">
      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-neutral-100 text-neutral-400">
        <FileSearch size={22} aria-hidden="true" />
      </div>
      <div className="flex flex-col gap-1.5">
        <h2 className="text-base font-semibold text-navy-600">
          No analysis history yet.
        </h2>
        <p className="text-xs sm:text-sm text-neutral-600 max-w-sm leading-relaxed">
          Completed analyses will appear here after the backend is connected.
        </p>
      </div>
      <Link
        to="/dashboard"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-xs font-semibold bg-teal-600 text-white hover:bg-teal-700 transition-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
      >
        Start an Analysis
        <ArrowRight size={13} aria-hidden="true" />
      </Link>
    </div>
  );
}
