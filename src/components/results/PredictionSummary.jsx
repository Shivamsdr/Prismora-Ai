import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import { CHEST_CLASSES, RETINAL_GRADES } from '@services/resultService';

/**
 * PredictionSummary — Renders either the accepted backend prediction or
 * an abstention warning explaining why no prediction was issued.
 */
export default function PredictionSummary({ result }) {
  if (!result) return null;

  const isAbstained = result.predictionStatus === 'abstained';
  const isChest = result.modality === 'chest';
  const referenceClasses = isChest ? CHEST_CLASSES : RETINAL_GRADES;

  if (isAbstained) {
    return (
      <section
        aria-labelledby="prediction-summary-heading"
        className="rounded-xl border border-amber-300 bg-amber-50/70 p-5 sm:p-6 shadow-sm flex flex-col gap-3"
      >
        <div className="flex items-start gap-3">
          <div className="shrink-0 flex items-center justify-center w-9 h-9 rounded-md bg-amber-100 text-amber-700 border border-amber-300">
            <AlertTriangle size={18} aria-hidden="true" />
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="font-mono text-2xs font-semibold uppercase tracking-widest text-amber-800">
              Selective Prediction · Abstained
            </span>
            <h2
              id="prediction-summary-heading"
              className="text-base sm:text-lg font-bold text-amber-950"
            >
              Prediction withheld — reliability criteria not met
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed text-amber-900">
              The system declined to provide an automated classification because the configured
              reliability criteria were not satisfied for this input. No accepted output is displayed.
            </p>
            <p className="text-xs leading-relaxed text-amber-800 pt-1">
              Please seek professional medical evaluation and review the original image directly.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      aria-labelledby="prediction-summary-heading"
      className="rounded-xl border border-neutral-200 bg-white p-5 sm:p-6 shadow-sm flex flex-col gap-4"
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="font-mono text-2xs text-neutral-400">01</span>
          <div className="w-3 h-px bg-neutral-300" />
          <h2
            id="prediction-summary-heading"
            className="text-sm font-semibold text-navy-600"
          >
            Prediction Summary
          </h2>
        </div>
        <span className="inline-flex items-center gap-1 font-mono text-2xs text-emerald-700">
          <CheckCircle2 size={12} aria-hidden="true" />
          Reliability criteria met
        </span>
      </div>

      <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 sm:p-5 flex flex-col gap-1.5">
        <span className="font-mono text-2xs uppercase tracking-wider text-neutral-500">
          Model Output ({isChest ? 'Chest Classification' : 'DR Severity Grade'})
        </span>
        <p className="text-xl sm:text-2xl font-bold tracking-tight text-navy-600">
          {result.prediction ?? 'Unavailable'}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-1.5 pt-1">
        <span className="font-mono text-2xs uppercase tracking-wider text-neutral-500 mr-1">
          Class space:
        </span>
        {referenceClasses.map((cls) => {
          const isMatch = result.prediction === cls;
          return (
            <span
              key={cls}
              className={[
                'px-2 py-0.5 rounded font-mono text-2xs border',
                isMatch
                  ? 'bg-teal-50 border-teal-300 text-teal-800 font-semibold'
                  : 'bg-white border-neutral-200 text-neutral-500',
              ].join(' ')}
            >
              {cls}
            </span>
          );
        })}
      </div>
    </section>
  );
}
