import { Info, CheckCircle2 } from 'lucide-react';

/**
 * ModelIntegrationNotice — Honest status panel displayed after clicking Analyse
 * while backend model inference is awaiting integration.
 */
export default function ModelIntegrationNotice({
  visible,
  message,
  endpoint,
  filename,
}) {
  if (!visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="rounded-lg border border-neutral-200 border-l-[3px] border-l-teal-600 bg-white p-5 shadow-xs"
    >
      <div className="flex items-start gap-3.5">
        <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-md bg-teal-50 text-teal-700 border border-teal-200">
          <Info size={16} aria-hidden="true" />
        </div>

        <div className="flex-1 flex flex-col gap-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-sm font-semibold text-navy-600">
              Awaiting Backend Model Integration
            </h3>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-amber-50 border border-amber-300 font-mono text-2xs font-semibold uppercase tracking-wider text-amber-800">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600" aria-hidden="true" />
              Pending Inference
            </span>
          </div>

          <p className="text-xs sm:text-sm leading-relaxed text-neutral-700">
            {message}
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 pt-2 border-t border-neutral-200">
            <div className="flex items-center gap-1.5 text-xs text-emerald-700">
              <CheckCircle2 size={13} aria-hidden="true" />
              <span className="font-mono text-2xs">
                Image validated locally{filename ? `: ${filename}` : ''}
              </span>
            </div>
            {endpoint && (
              <span className="font-mono text-2xs text-neutral-500">
                Target endpoint: {endpoint}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
