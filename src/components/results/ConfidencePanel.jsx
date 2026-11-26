/**
 * ConfidencePanel — Displays the actual confidence returned by the backend,
 * or an explicit unavailable state. Never invents or labels uncalibrated values
 * as calibrated.
 */
export default function ConfidencePanel({ confidence }) {
  const hasConfidence = typeof confidence === 'number' && Number.isFinite(confidence);

  return (
    <section
      aria-labelledby="confidence-panel-heading"
      className="rounded-xl border border-neutral-200 bg-white p-5 sm:p-6 shadow-sm flex flex-col gap-4"
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="font-mono text-2xs text-neutral-400">02</span>
          <div className="w-3 h-px bg-neutral-300" />
          <h2
            id="confidence-panel-heading"
            className="text-sm font-semibold text-navy-600"
          >
            Model Confidence
          </h2>
        </div>

        <span className="font-mono text-sm font-semibold text-navy-600">
          {hasConfidence ? `${confidence.toFixed(1)}%` : 'Confidence unavailable'}
        </span>
      </div>

      {hasConfidence ? (
        <div className="flex flex-col gap-2">
          <div
            className="w-full h-2.5 rounded-full bg-neutral-100 border border-neutral-200 overflow-hidden"
            role="progressbar"
            aria-valuenow={confidence}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Model output confidence"
          >
            <div
              className="h-full bg-teal-600 transition-base"
              style={{ width: `${Math.min(100, Math.max(0, confidence))}%` }}
            />
          </div>
          <div className="flex justify-between font-mono text-2xs text-neutral-400">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>
      ) : (
        <div className="rounded-md border border-neutral-200 bg-neutral-50 px-4 py-3">
          <p className="font-mono text-xs text-neutral-600">
            Confidence unavailable for this record.
          </p>
        </div>
      )}

      <p className="text-xs leading-relaxed text-neutral-600 pt-2 border-t border-neutral-200">
        Model confidence reflects raw score probability from the neural network and is not
        the same as diagnostic certainty.
      </p>
    </section>
  );
}
