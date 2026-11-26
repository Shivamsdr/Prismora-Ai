import { CheckCircle2, AlertTriangle } from 'lucide-react';

/**
 * ResultStatus — Displays whether the model accepted or abstained from a prediction.
 */
export default function ResultStatus({ status }) {
  const isAbstained = status === 'abstained';

  return (
    <span
      className={[
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded border font-mono text-2xs font-semibold uppercase tracking-wider',
        isAbstained
          ? 'bg-amber-50 border-amber-300 text-amber-800'
          : 'bg-emerald-50 border-emerald-200 text-emerald-800',
      ].join(' ')}
    >
      {isAbstained ? (
        <AlertTriangle size={12} className="text-amber-600" aria-hidden="true" />
      ) : (
        <CheckCircle2 size={12} className="text-emerald-600" aria-hidden="true" />
      )}
      {isAbstained ? 'Abstained' : 'Accepted'}
    </span>
  );
}
