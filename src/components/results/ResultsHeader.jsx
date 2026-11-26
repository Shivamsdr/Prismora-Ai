import { FlaskConical, Eye } from 'lucide-react';
import ResultStatus from './ResultStatus';

/**
 * ResultsHeader — Displays analysis title, modality, timestamp, ID,
 * model version (if returned), and prediction status.
 */
export default function ResultsHeader({ result }) {
  if (!result) return null;

  const isChest = result.modality === 'chest';
  const ModalityIcon = isChest ? FlaskConical : Eye;
  const modalityLabel = isChest ? 'Chest X-ray' : 'Retinal Fundus';

  const formattedDate = result.createdAt
    ? new Date(result.createdAt).toLocaleString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : 'Timestamp unavailable';

  const modelSummary = [result.modelName, result.modelVersion]
    .filter(Boolean)
    .join(' · ');

  return (
    <header className="rounded-xl border border-neutral-200 bg-white p-5 sm:p-6 shadow-sm flex flex-col gap-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-7 h-7 rounded-md bg-teal-50 text-teal-600">
              <ModalityIcon size={14} aria-hidden="true" />
            </div>
            <span className="font-mono text-2xs font-semibold uppercase tracking-widest text-teal-700">
              {modalityLabel}
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-navy-600">
            {result.title || `${modalityLabel} Analysis`}
          </h1>
        </div>

        <ResultStatus status={result.predictionStatus} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-neutral-200">
        <MetaItem label="Analysis ID" value={result.id ?? 'Unavailable'} mono />
        <MetaItem label="Date & Time" value={formattedDate} mono />
        <MetaItem
          label="Model"
          value={modelSummary || 'Not specified'}
          mono
        />
      </div>
    </header>
  );
}

function MetaItem({ label, value, mono = false }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="font-mono text-2xs uppercase tracking-wider text-neutral-500">
        {label}
      </span>
      <span
        className={`text-xs text-neutral-800 break-all ${
          mono ? 'font-mono' : ''
        }`}
      >
        {value}
      </span>
    </div>
  );
}
