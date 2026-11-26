import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, AlertCircle, Loader2, X } from 'lucide-react';
import WorkspaceLayout from '@components/layout/WorkspaceLayout';
import HistoryFilters from '@components/history/HistoryFilters';
import HistoryList from '@components/history/HistoryList';
import HistoryEmptyState from '@components/history/HistoryEmptyState';
import ClearHistoryDialog from '@components/history/ClearHistoryDialog';
import useHistory from '@hooks/useHistory';

/**
 * History — Local Analysis History backed by IndexedDB.
 *
 * Displays metadata for genuine completed analyses stored locally on this
 * browser. Never stores original medical images by default or fabricates
 * sample records.
 */
export default function History() {
  const {
    sessions,
    loading,
    error,
    actionError,
    refresh,
    remove,
    clear,
    clearActionError,
  } = useHistory();

  const [activeFilter, setActiveFilter] = useState('all');
  const [confirmClearOpen, setConfirmClearOpen] = useState(false);

  const counts = useMemo(() => {
    const chest = sessions.filter((s) => s.modality === 'chest').length;
    const retina = sessions.filter((s) => s.modality === 'retina').length;
    return {
      all: sessions.length,
      chest,
      retina,
    };
  }, [sessions]);

  const filteredSessions = useMemo(() => {
    if (activeFilter === 'all') return sessions;
    return sessions.filter((s) => s.modality === activeFilter);
  }, [sessions, activeFilter]);

  async function handleConfirmClear() {
    const success = await clear();
    if (success) {
      setConfirmClearOpen(false);
    }
  }

  return (
    <WorkspaceLayout>
      <div
        className="content-width py-8 sm:py-10 flex flex-col gap-8"
        style={{ maxWidth: '1200px' }}
      >
        {/* ── Header ─────────────────────────────────────────── */}
        <section className="flex flex-col gap-3">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-600 hover:text-teal-600 transition-base w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded"
          >
            <ArrowLeft size={13} aria-hidden="true" />
            Back to Workspace
          </Link>

          <div className="flex items-center gap-2.5 mt-1">
            <div className="w-5 h-px bg-teal-600" />
            <span className="font-mono text-2xs font-medium uppercase tracking-widest text-teal-700">
              Local Storage · IndexedDB
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-navy-600">
              Analysis History
            </h1>
            <p className="text-sm sm:text-base text-neutral-700 max-w-2xl leading-relaxed">
              Review your previous medical image analyses stored locally on this device.
            </p>
          </div>

          <div className="mt-1 border-t border-neutral-200" />
        </section>

        {/* ── Summary Counts (derived strictly from stored records) ── */}
        <section
          aria-label="History summary"
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          <SummaryCard label="Total Stored Analyses" value={counts.all} />
          <SummaryCard label="Chest X-ray" value={counts.chest} />
          <SummaryCard label="Retinal Fundus" value={counts.retina} />
        </section>

        {/* ── IndexedDB Error Banner (load or action error) ──── */}
        {(error || actionError) && (
          <div
            role="alert"
            className="flex items-start justify-between gap-3 px-4 py-3 rounded-lg border border-red-200 bg-red-50 text-red-800"
          >
            <div className="flex items-start gap-2.5">
              <AlertCircle size={16} className="shrink-0 mt-0.5 text-red-600" aria-hidden="true" />
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-semibold text-red-900">
                  Local Storage Error
                </span>
                <p className="text-xs text-red-700 leading-relaxed">
                  {(error || actionError)?.message ||
                    'An IndexedDB error occurred while accessing local analysis history.'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {error && (
                <button
                  type="button"
                  onClick={refresh}
                  className="text-xs font-semibold text-red-800 underline underline-offset-2"
                >
                  Retry
                </button>
              )}
              {actionError && (
                <button
                  type="button"
                  onClick={clearActionError}
                  aria-label="Dismiss storage error"
                  className="p-1 rounded text-red-600 hover:bg-red-100 transition-base"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        )}

        {/* ── Filters + Table / Empty State ──────────────────── */}
        <section className="flex flex-col gap-4">
          <HistoryFilters
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            counts={counts}
            totalCount={sessions.length}
            loading={loading}
            onRefresh={refresh}
            onRequestClearAll={() => setConfirmClearOpen(true)}
          />

          <div className="rounded-xl border border-neutral-200 bg-white shadow-sm overflow-hidden">
            {loading ? (
              <div className="flex items-center justify-center gap-3 py-14 text-neutral-500">
                <Loader2 size={16} className="animate-spin text-teal-600" aria-hidden="true" />
                <span className="text-sm">Loading local analysis history…</span>
              </div>
            ) : filteredSessions.length === 0 ? (
              <HistoryEmptyState
                isFiltered={sessions.length > 0 && activeFilter !== 'all'}
                activeFilter={activeFilter}
                onResetFilter={() => setActiveFilter('all')}
              />
            ) : (
              <HistoryList sessions={filteredSessions} onDelete={remove} />
            )}
          </div>
        </section>

        {/* ── Local Privacy & Research Disclaimer ────────────── */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-lg border border-neutral-200 bg-white p-4 flex items-start gap-3">
            <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-md bg-teal-50 text-teal-700">
              <Shield size={15} aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-semibold text-navy-600 mb-1">
                Local Browser Privacy
              </p>
              <p className="text-xs leading-relaxed text-neutral-600">
                Your analysis history is stored locally in this browser. It is not
                synchronized to an account or cloud service.
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-neutral-200 border-l-[3px] border-l-teal-600 bg-white p-4">
            <p className="text-xs font-semibold text-navy-600 mb-1">
              Research Prototype Disclaimer
            </p>
            <p className="text-xs leading-relaxed text-neutral-600">
              PRISMORA AI is a research prototype. Stored outputs are intended for research
              and educational exploration only and are not a substitute for professional
              medical evaluation.
            </p>
          </div>
        </section>
      </div>

      <ClearHistoryDialog
        open={confirmClearOpen}
        recordCount={sessions.length}
        onConfirm={handleConfirmClear}
        onCancel={() => setConfirmClearOpen(false)}
      />
    </WorkspaceLayout>
  );
}

function SummaryCard({ label, value }) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white px-5 py-4 shadow-xs flex items-center justify-between gap-4">
      <span className="font-mono text-2xs uppercase tracking-wider text-neutral-500">
        {label}
      </span>
      <span className="font-mono text-xl font-bold text-navy-600">
        {value}
      </span>
    </div>
  );
}
