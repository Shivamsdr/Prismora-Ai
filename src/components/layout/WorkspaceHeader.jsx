import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, FlaskConical, Eye, History,
  BookOpen, Info, Menu, X, ExternalLink,
} from 'lucide-react';

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

const NAV_ITEMS = [
  { label: 'Dashboard',       to: '/dashboard',       icon: LayoutDashboard },
  { label: 'Chest X-Ray',     to: '/analysis/chest',  icon: FlaskConical    },
  { label: 'Retinal Imaging', to: '/analysis/retina', icon: Eye             },
  { label: 'History',         to: '/history',         icon: History         },
  { label: 'Research',        to: '/research',        icon: BookOpen        },
  { label: 'About',           to: '/about',           icon: Info            },
];

/**
 * WorkspaceHeader — compact top bar for the application workspace.
 * Distinct from the public Navbar used on the landing/login pages.
 */
export default function WorkspaceHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isActive = (to) =>
    to === '/dashboard'
      ? location.pathname === '/dashboard'
      : location.pathname.startsWith(to);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-sticky flex items-center"
        style={{
          height: 'var(--navbar-height)',
          background: 'var(--color-surface)',
          borderBottom: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-xs)',
        }}
      >
        <div className="flex items-center justify-between w-full px-4 sm:px-6">

          {/* ── Left: brand + workspace label ───────────────── */}
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="flex items-center gap-2 group"
              aria-label="PRISMORA — back to home"
            >
              <PrismoraSymbol size={22} />
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  letterSpacing: '0.16em',
                  color: 'var(--color-secondary)',
                }}
                className="hidden sm:block group-hover:text-teal-600 transition-base"
              >
                PRISMORA
              </span>
            </Link>

            {/* Separator */}
            <div
              className="hidden sm:block w-px h-4"
              style={{ background: 'var(--color-border-strong)' }}
            />

            {/* Workspace label */}
            <span
              className="hidden sm:block"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                fontWeight: 500,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--color-text-disabled)',
              }}
            >
              Imaging Workspace
            </span>
          </div>

          {/* ── Centre: desktop nav ──────────────────────────── */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Workspace">
            {NAV_ITEMS.map(({ label, to, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className={[
                  'flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-base',
                  isActive(to)
                    ? 'bg-teal-50 text-teal-700'
                    : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100',
                ].join(' ')}
                style={{ borderRadius: 'var(--radius-md)', fontFamily: 'var(--font-sans)' }}
              >
                <Icon size={13} />
                {label}
              </Link>
            ))}
          </nav>

          {/* ── Right: status pill + public home ────────────── */}
          <div className="flex items-center gap-3">
            {/* Research prototype badge */}
            <div
              className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded"
              style={{
                background: '#fef3c7',
                border: '1px solid #fcd34d',
                borderRadius: 'var(--radius-md)',
              }}
            >
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: '#d97706' }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.58rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  color: '#92400e',
                  textTransform: 'uppercase',
                }}
              >
                Research Prototype
              </span>
            </div>

            {/* Back to public site */}
            <Link
              to="/"
              className="hidden md:flex items-center gap-1 text-xs font-medium transition-base"
              style={{ color: 'var(--color-text-tertiary)', fontFamily: 'var(--font-sans)' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--color-primary)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-tertiary)'}
            >
              <ExternalLink size={11} />
              Home
            </Link>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-1.5 rounded text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 transition-base"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(v => !v)}
              style={{ borderRadius: 'var(--radius-md)' }}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile nav dropdown ──────────────────────────────── */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed left-0 right-0 z-dropdown"
          style={{
            top: 'var(--navbar-height)',
            background: 'var(--color-surface)',
            borderBottom: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-md)',
          }}
        >
          <nav className="flex flex-col gap-0.5 p-3" aria-label="Workspace mobile">
            {NAV_ITEMS.map(({ label, to, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMobileOpen(false)}
                className={[
                  'flex items-center gap-2.5 px-3 py-2.5 rounded text-sm font-medium transition-base',
                  isActive(to)
                    ? 'bg-teal-50 text-teal-700'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50',
                ].join(' ')}
                style={{ borderRadius: 'var(--radius-md)' }}
              >
                <Icon size={15} />
                {label}
              </Link>
            ))}
            <div className="mt-2 pt-2" style={{ borderTop: '1px solid var(--color-border)' }}>
              <Link
                to="/"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-xs text-neutral-400 hover:text-teal-600 transition-base"
              >
                <ExternalLink size={12} />
                Back to public homepage
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
