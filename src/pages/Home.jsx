/**
 * Home — PRISMORA AI landing page.
 *
 * Full design to be implemented in Phase 2.
 * Placeholder preserves routing integrity.
 */
export default function Home() {
  return (
    <PageShell
      label="Landing"
      title="PRISMORA AI"
      description="Unified Medical Image Analysis Research Platform"
      route="/"
    />
  );
}

/* ── Shared page shell for the foundation phase ───────────────── */
function PageShell({ label, title, description, route }) {
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center gap-4 px-6">
      <span className="label-caps">{route}</span>
      <h1
        className="text-4xl font-bold tracking-tighter text-neutral-900"
        style={{ fontFamily: 'var(--font-sans)' }}
      >
        {title}
      </h1>
      {description && (
        <p className="text-sm text-neutral-500 max-w-sm text-center">{description}</p>
      )}
      <div className="badge badge-primary mt-2">{label}</div>
      <p className="text-xs text-neutral-400 mt-6">
        This page will be fully designed in a subsequent phase.
      </p>
      <nav className="flex flex-wrap gap-3 justify-center mt-4 text-xs">
        {[
          ['/', 'Home'],
          ['/login', 'Login'],
          ['/dashboard', 'Dashboard'],
          ['/analysis/chest', 'Chest Analysis'],
          ['/analysis/retina', 'Retinal Analysis'],
          ['/results', 'Results'],
          ['/history', 'History'],
          ['/research', 'Research'],
          ['/about', 'About'],
        ].map(([href, name]) => (
          <a
            key={href}
            href={href}
            className="px-3 py-1 rounded border border-neutral-200 text-neutral-600 hover:border-teal-500 hover:text-teal-600 transition-base"
          >
            {name}
          </a>
        ))}
      </nav>
    </div>
  );
}
