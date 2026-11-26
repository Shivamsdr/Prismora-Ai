import { Link } from 'react-router-dom';
import { FlaskConical, Eye, Trash2, ArrowUpRight } from 'lucide-react';
import ResultStatus from '@components/results/ResultStatus';

/**
 * HistoryItem — Renders a single locally stored analysis record.
 * Responsive: table row on md+ screens, structured card on smaller screens.
 */
export default function HistoryItem({ record, onDelete, isLast }) {
  const sessionId = record.sessionId ?? record.id;
  const isChest = record.modality === 'chest';
  const ModalityIcon = isChest ? FlaskConical : Eye;
  const modalityLabel = isChest ? 'Chest X-ray' : 'Retinal Fundus';

  const isAbstained =
    record.predictionStatus === 'abstained' || record.status === 'abstained';

  const predictionDisplay = isAbstained
    ? 'Prediction abstained'
    : record.prediction ?? 'Unavailable';

  const confidenceDisplay =
    typeof record.confidence === 'number' && Number.isFinite(record.confidence)
      ? `${record.confidence.toFixed(1)}%`
      : 'Unavailable';

  const modelDisplay =
    [record.modelName, record.modelVersion].filter(Boolean).join(' · ') || '—';

  const dateDisplay = record.createdAt
    ? new Date(record.createdAt).toLocaleString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : '—';

  return (
    <div
      className={`px-5 py-4 flex flex-col md:grid md:items-center gap-3 md:gap-4 ${
        !isLast ? 'border-b border-neutral-200' : ''
      } hover:bg-neutral-50/80 transition-base`}
      style={{ gridTemplateColumns: '1.2fr 1.4fr 0.9fr 1fr 1.1fr auto' }}
    >
      {/* Modality */}
      <div className="flex items-center justify-between md:justify-start gap-2.5">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-7 h-7 rounded bg-teal-50 text-teal-600 shrink-0">
            <ModalityIcon size={13} aria-hidden="true" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-navy-600">
              {modalityLabel}
            </span>
            {record.filename && (
              <span
                className="font-mono text-2xs text-neutral-500 truncate max-w-[160px]"
                title={record.filename}
              >
                {record.filename}
              </span>
            )}
          </div>
        </div>

        <div className="md:hidden">
          <ResultStatus status={isAbstained ? 'abstained' : 'accepted'} />
        </div>
      </div>

      {/* Prediction & Status */}
      <div className="flex items-center gap-2 flex-wrap">
        <span
          className={`text-xs font-medium ${
            isAbstained ? 'text-amber-800' : 'text-neutral-900'
          }`}
        >
          {predictionDisplay}
        </span>
        <span className="hidden md:inline-flex">
          <ResultStatus status={isAbstained ? 'abstained' : 'accepted'} />
        </span>
      </div>

      {/* Confidence */}
      <div className="flex items-center justify-between md:block">
        <span className="md:hidden font-mono text-2xs uppercase tracking-wider text-neutral-500">
          Confidence
        </span>
        <span className="font-mono text-xs text-neutral-700">
          {confidenceDisplay}
        </span>
      </div>

      {/* Model */}
      <div className="flex items-center justify-between md:block">
        <span className="md:hidden font-mono text-2xs uppercase tracking-wider text-neutral-500">
          Model
        </span>
        <span className="font-mono text-xs text-neutral-600 break-all">
          {modelDisplay}
        </span>
      </div>

      {/* Date & Time */}
      <div className="flex items-center justify-between md:block">
        <span className="md:hidden font-mono text-2xs uppercase tracking-wider text-neutral-500">
          Date
        </span>
        <span className="font-mono text-2xs text-neutral-500">
          {dateDisplay}
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-neutral-100">
        <Link
          to={`/results?id=${encodeURIComponent(sessionId)}`}
          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded text-xs font-medium border border-neutral-200 bg-white text-teal-700 hover:border-teal-600 hover:bg-teal-50 transition-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
        >
          View details
          <ArrowUpRight size={12} aria-hidden="true" />
        </Link>

        <button
          type="button"
          onClick={() => onDelete(sessionId)}
          aria-label={`Delete ${modalityLabel} record from ${dateDisplay}`}
          className="inline-flex items-center justify-center p-1.5 rounded border border-neutral-200 bg-white text-neutral-500 hover:border-red-300 hover:text-red-700 hover:bg-red-50 transition-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
        >
          <Trash2 size={13} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
