import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

/**
 * PrismoraSymbol — custom geometric mark representing a prism / light refraction.
 * SVG-drawn, no external assets.
 */
function PrismoraSymbol({ size = 28 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden="true"
    >
      {/* Triangle prism */}
      <polygon
        points="14,3 26,24 2,24"
        fill="none"
        stroke="#0d9488"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      {/* Inner light line */}
      <line x1="14" y1="3" x2="14" y2="24" stroke="#5eead4" strokeWidth="1" strokeDasharray="2 2" />
      {/* Refraction ray */}
      <line x1="14" y1="24" x2="21" y2="27" stroke="#0d9488" strokeWidth="1.25" strokeLinecap="round" />
      <line x1="14" y1="24" x2="7" y2="27" stroke="#14b8a6" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

const NAV_LINKS = [
  { label: 'Platform', to: '/dashboard' },
  { label: 'Research', to: '/research' },
  { label: 'About',    to: '/about'    },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled]  = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  return (
    <header
      className={[
        'fixed top-0 left-0 right-0 z-sticky',
        'transition-all duration-slow',
        scrolled
          ? 'bg-white border-b border-neutral-200 shadow-xs'
          : 'bg-transparent',
      ].join(' ')}
      style={{ height: 'var(--navbar-height)' }}
    >
      <div
        className="content-width h-full flex items-center justify-between"
        style={{ maxWidth: '1200px' }}
      >
        {/* ── Wordmark ──────────────────────────────────────── */}
        <Link
          to="/"
          className="flex items-center gap-2 group"
          aria-label="PRISMORA AI — home"
        >
          <PrismoraSymbol size={26} />
          <span
            className="text-sm font-bold tracking-widest text-navy-600 group-hover:text-teal-600 transition-base"
            style={{
              fontFamily: 'var(--font-sans)',
              color: 'var(--color-secondary)',
              letterSpacing: '0.14em',
            }}
          >
            PRISMORA
          </span>
        </Link>

        {/* ── Desktop nav ───────────────────────────────────── */}
        <nav className="hidden md:flex items-center gap-7" aria-label="Primary">
          {NAV_LINKS.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className={[
                'text-sm font-medium transition-base relative',
                location.pathname.startsWith(to)
                  ? 'text-teal-600'
                  : 'text-neutral-600 hover:text-neutral-900',
              ].join(' ')}
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* ── Desktop actions ────────────────────────────────── */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/login"
            className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-base"
          >
            Sign in
          </Link>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded text-sm font-semibold transition-base"
            style={{
              background: 'var(--color-primary)',
              color: '#fff',
              borderRadius: 'var(--radius-md)',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--color-primary-dark)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--color-primary)'}
          >
            Explore platform
          </Link>
        </div>

        {/* ── Mobile hamburger ──────────────────────────────── */}
        <button
          className="md:hidden p-2 rounded text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-base"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(v => !v)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* ── Mobile menu ───────────────────────────────────────── */}
      {menuOpen && (
        <div className="md:hidden border-t border-neutral-200 bg-white shadow-md">
          <nav className="content-width py-4 flex flex-col gap-1" style={{ maxWidth: '1200px' }}>
            {NAV_LINKS.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className="px-3 py-2.5 rounded text-sm font-medium text-neutral-700 hover:text-teal-600 hover:bg-teal-50 transition-base"
              >
                {label}
              </Link>
            ))}
            <div className="mt-3 pt-3 border-t border-neutral-100 flex flex-col gap-2">
              <Link
                to="/login"
                className="px-3 py-2.5 rounded text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 transition-base"
              >
                Sign in
              </Link>
              <Link
                to="/dashboard"
                className="px-3 py-2.5 rounded text-sm font-semibold text-white transition-base text-center"
                style={{ background: 'var(--color-primary)', borderRadius: 'var(--radius-md)' }}
              >
                Explore platform
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
