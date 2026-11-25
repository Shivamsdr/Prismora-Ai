/**
 * ModalitySpecCard — Compact scientific specification panel for an imaging
 * analysis workspace.
 */
export default function ModalitySpecCard({ icon: Icon, tag, specs }) {
  return (
    <aside className="rounded-xl border border-neutral-200 bg-white shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-neutral-200 bg-neutral-100/70">
        <div className="flex items-center gap-2">
          {Icon && (
            <div className="flex items-center justify-center w-6 h-6 rounded bg-teal-50 text-teal-600">
              <Icon size={13} aria-hidden="true" />
            </div>
          )}
          <span className="font-mono text-2xs font-semibold uppercase tracking-widest text-teal-700">
            {tag}
          </span>
        </div>

        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-amber-50 border border-amber-300 font-mono text-2xs font-semibold uppercase tracking-wider text-amber-800">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-600" aria-hidden="true" />
          Research Stage
        </span>
      </div>

      <div className="divide-y divide-neutral-200">
        {specs.map(({ label, value, highlight }, index) => (
          <div
            key={label}
            className={`flex items-start justify-between gap-4 px-5 py-2.5 ${
              index % 2 === 1 ? 'bg-neutral-50' : 'bg-white'
            }`}
          >
            <span className="font-mono text-2xs uppercase tracking-wider text-neutral-500 shrink-0 pt-0.5">
              {label}
            </span>
            <span
              className={`font-mono text-xs text-right ${
                highlight ? 'text-amber-700 font-medium' : 'text-neutral-700'
              }`}
            >
              {value}
            </span>
          </div>
        ))}
      </div>
    </aside>
  );
}
