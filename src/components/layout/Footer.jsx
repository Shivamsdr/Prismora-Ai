import { Link } from 'react-router-dom';

function PrismoraSymbol({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <polygon points="14,3 26,24 2,24" fill="none" stroke="#0d9488" strokeWidth="1.75" strokeLinejoin="round" />
      <line x1="14" y1="3" x2="14" y2="24" stroke="#5eead4" strokeWidth="1" strokeDasharray="2 2" />
      <line x1="14" y1="24" x2="21" y2="27" stroke="#0d9488" strokeWidth="1.25" strokeLinecap="round" />
      <line x1="14" y1="24" x2="7" y2="27" stroke="#14b8a6" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer
      className="border-t border-neutral-200"
      style={{ background: 'var(--color-surface)' }}
    >
      <div className="content-width py-10" style={{ maxWidth: '1200px' }}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1 flex flex-col gap-3">
            <Link to="/" className="flex items-center gap-2 group w-fit">
              <PrismoraSymbol size={20} />
              <span
                className="text-xs font-bold tracking-widest"
                style={{ color: 'var(--color-secondary)', letterSpacing: '0.14em' }}
              >
                PRISMORA
              </span>
            </Link>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-tertiary)', maxWidth: '17rem' }}>
              A research prototype for medical image analysis. Not a clinical diagnostic system.
            </p>
          </div>

          {/* Platform */}
          <div>
            <p className="label-caps mb-3">Platform</p>
            <ul className="flex flex-col gap-2">
              {[
                ['Chest Analysis', '/analysis/chest'],
                ['Retinal Analysis', '/analysis/retina'],
                ['Dashboard', '/dashboard'],
                ['History', '/history'],
              ].map(([label, to]) => (
                <li key={to}>
                  <Link to={to} className="text-xs text-neutral-500 hover:text-teal-600 transition-base">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Research */}
          <div>
            <p className="label-caps mb-3">Research</p>
            <ul className="flex flex-col gap-2">
              {[
                ['Research Overview', '/research'],
                ['About', '/about'],
              ].map(([label, to]) => (
                <li key={to}>
                  <Link to={to} className="text-xs text-neutral-500 hover:text-teal-600 transition-base">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Disclaimer */}
          <div>
            <p className="label-caps mb-3">Research Disclaimer</p>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-tertiary)' }}>
              PRISMORA AI is an academic research prototype under active development. All models are experimental.
              Outputs must not be used for clinical decision-making.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-8 pt-6 border-t border-neutral-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2"
        >
          <span className="text-xs" style={{ color: 'var(--color-text-disabled)', fontFamily: 'var(--font-mono)' }}>
            © {new Date().getFullYear()} PRISMORA AI — Ayush Kumar. All rights reserved.
          </span>
          <span className="text-xs" style={{ color: 'var(--color-text-disabled)', fontFamily: 'var(--font-mono)' }}>
            Research Prototype · v1.0.0 · frontend-staging
          </span>
        </div>
      </div>
    </footer>
  );
}
