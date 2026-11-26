import { RefreshCw, Trash2 } from 'lucide-react';

const FILTER_OPTIONS = [
  { id: 'all', label: 'All' },
  { id: 'chest', label: 'Chest X-ray' },
  { id: 'retina', label: 'Retinal Fundus' },
];

/**
 * HistoryFilters — Modality filter tabs with actual counts, plus Refresh
 * and Clear All actions.
 */
export default function HistoryFilters({
  activeFilter,
  onFilterChange,
  counts,
  totalCount,
  loading,
  onRefresh,
  onRequestClearAll,
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      {/* Modality Filter Tabs */}
      <div
        role="group"
        aria-label="Filter history by modality"
        className="inline-flex flex-wrap items-center gap-1.5"
      >
        {FILTER_OPTIONS.map(({ id, label }) => {
          const isActive = activeFilter === id;
          const count = counts?.[id] ?? 0;

          return (
            <button
              key={id}
              type="button"
              aria-pressed={isActive}
              onClick={() => onFilterChange(id)}
              className={[
                'inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium border transition-base',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500',
                isActive
                  ? 'bg-teal-50 border-teal-300 text-teal-800'
                  : 'bg-white border-neutral-200 text-neutral-600 hover:border-neutral-300 hover:text-neutral-900',
              ].join(' ')}
            >
              <span>{label}</span>
              <span
                className={[
                  'font-mono text-2xs px-1.5 py-0.5 rounded',
                  isActive
                    ? 'bg-teal-100 text-teal-800'
                    : 'bg-neutral-100 text-neutral-500',
                ].join(' ')}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onRefresh}
          disabled={loading}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border border-neutral-200 bg-white text-neutral-700 hover:border-teal-600 hover:text-teal-700 transition-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 disabled:opacity-50"
        >
          <RefreshCw size={12} className={loading ? 'animate-spin' : ''} aria-hidden="true" />
          Refresh
        </button>

        <button
          type="button"
          onClick={onRequestClearAll}
          disabled={totalCount === 0 || loading}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border border-neutral-200 bg-white text-neutral-700 hover:border-red-300 hover:text-red-700 hover:bg-red-50 transition-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-neutral-200 disabled:hover:bg-white disabled:hover:text-neutral-700"
        >
          <Trash2 size={12} aria-hidden="true" />
          Clear all
        </button>
      </div>
    </div>
  );
}
