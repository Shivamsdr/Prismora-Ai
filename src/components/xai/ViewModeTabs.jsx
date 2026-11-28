import { VIEW_MODES } from './xaiConfig';

export default function ViewModeTabs({ mode, onChange, availability }) {
  return (
    <div role="tablist" aria-label="View mode" className="inline-flex flex-wrap gap-1 rounded-md border border-neutral-200 bg-neutral-50 p-1">
      {VIEW_MODES.map((m) => {
        const enabled = availability[m.id];
        const active = mode === m.id;
        return (
          <button
            key={m.id}
            role="tab"
            type="button"
            aria-selected={active}
            disabled={!enabled}
            onClick={() => onChange(m.id)}
            className={[
              'px-3 py-1.5 rounded text-xs font-medium transition-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500',
              active ? 'bg-navy-600 text-white shadow-xs' : 'text-neutral-600 hover:text-navy-600',
              !enabled ? 'opacity-40 cursor-not-allowed hover:text-neutral-600' : '',
            ].join(' ')}
          >
            {m.label}
          </button>
        );
      })}
    </div>
  );
}
