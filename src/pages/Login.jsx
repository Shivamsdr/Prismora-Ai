import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowLeft, ArrowRight } from 'lucide-react';
import RetinaVisual from '@components/common/RetinaVisual';

/* ─────────────────────────────────────────────────────────
   LOGIN PAGE — UI-only demonstration.

   IMPORTANT:
   - No real authentication is implemented.
   - No passwords are stored or transmitted.
   - Sign in action notifies the user clearly.
   - "Continue without login" navigates to /dashboard.
   - The login page never blocks platform access.
───────────────────────────────────────────────────────── */

function PrismoraSymbol({ size = 26 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <polygon points="14,3 26,24 2,24" fill="none" stroke="#0d9488" strokeWidth="1.75" strokeLinejoin="round" />
      <line x1="14" y1="3" x2="14" y2="24" stroke="#5eead4" strokeWidth="1" strokeDasharray="2 2" />
      <line x1="14" y1="24" x2="21" y2="27" stroke="#0d9488" strokeWidth="1.25" strokeLinecap="round" />
      <line x1="14" y1="24" x2="7" y2="27" stroke="#14b8a6" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

export default function Login() {
  const navigate = useNavigate();

  const [email,       setEmail]       = useState('');
  const [password,    setPassword]    = useState('');
  const [showPass,    setShowPass]    = useState(false);
  const [notice,      setNotice]      = useState(null);  // { kind: 'info'|'warn', msg }
  const [submitting,  setSubmitting]  = useState(false);

  /* Sign in — UI-only: surfaces a clear notice */
  function handleSignIn(e) {
    e.preventDefault();
    if (!email || !password) {
      setNotice({ kind: 'warn', msg: 'Please enter an email address and password.' });
      return;
    }
    setSubmitting(true);
    // Simulate a brief moment then surface the notice
    setTimeout(() => {
      setSubmitting(false);
      setNotice({
        kind: 'info',
        msg: 'Authentication is not connected in this phase. This is a UI demonstration only. Use "Continue without login" to access the platform.',
      });
    }, 700);
  }

  /* Continue without login — direct navigation */
  function handleContinue() {
    navigate('/dashboard');
  }

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--color-bg)' }}>

      {/* ══════════════════════════════════════════════════
          LEFT PANEL — Identity + scientific visual
      ══════════════════════════════════════════════════ */}
      <div
        className="hidden lg:flex flex-col justify-between relative overflow-hidden"
        style={{
          width: '48%',
          minWidth: '420px',
          background: 'var(--color-secondary)',
          padding: 'clamp(2.5rem,4vw,3.5rem)',
        }}
      >
        {/* Fine grid overlay */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          aria-hidden="true"
        >
          <defs>
            <pattern id="login-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.75" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#login-grid)" />
        </svg>

        {/* Teal glow accent — top-right */}
        <div
          className="absolute top-0 right-0 pointer-events-none"
          style={{
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle at 100% 0%, rgba(20,184,166,0.12) 0%, transparent 65%)',
          }}
        />

        {/* Top: wordmark */}
        <div className="relative z-10 flex items-center gap-2.5">
          <PrismoraSymbol size={28} />
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.16em',
              color: 'rgba(255,255,255,0.9)',
            }}
          >
            PRISMORA
          </span>
        </div>

        {/* Middle: identity copy */}
        <div className="relative z-10 flex flex-col gap-5">
          <div
            className="flex items-center gap-2 mb-1"
          >
            <div className="w-5 h-px" style={{ background: 'rgba(94,234,212,0.6)' }} />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#5eead4',
              }}
            >
              Medical Image Analysis
            </span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(1.75rem,3vw,2.5rem)',
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              color: '#ffffff',
            }}
          >
            Research-grade<br />
            <span style={{ color: '#5eead4' }}>imaging analysis</span><br />
            for the lab.
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.9rem',
              lineHeight: 1.65,
              color: 'rgba(255,255,255,0.6)',
              maxWidth: '36ch',
            }}
          >
            An integrated platform for chest X-ray classification and
            retinal disease severity grading, built for academic exploration
            and transparent AI research.
          </p>

          {/* Visual */}
          <div className="mt-2">
            <RetinaVisual />
          </div>
        </div>

        {/* Bottom: disclaimer */}
        <div className="relative z-10">
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              letterSpacing: '0.04em',
              lineHeight: 1.6,
              color: 'rgba(255,255,255,0.3)',
            }}
          >
            Research prototype · Not a clinical diagnostic system ·{' '}
            Ayush Kumar
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          RIGHT PANEL — Login form
      ══════════════════════════════════════════════════ */}
      <div
        className="flex-1 flex flex-col justify-center px-6 sm:px-10 lg:px-16"
        style={{ background: 'var(--color-bg)' }}
      >
        {/* Mobile wordmark */}
        <div className="lg:hidden flex items-center gap-2 mb-10">
          <PrismoraSymbol size={22} />
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.16em',
              color: 'var(--color-secondary)',
            }}
          >
            PRISMORA
          </span>
        </div>

        <div style={{ maxWidth: '380px', width: '100%', margin: '0 auto' }}>
          {/* Back link */}
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 mb-8 text-xs font-medium transition-base"
            style={{ color: 'var(--color-text-tertiary)', fontFamily: 'var(--font-sans)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--color-primary)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-tertiary)'}
          >
            <ArrowLeft size={13} />
            Back to home
          </Link>

          {/* Form header */}
          <div className="mb-7">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-5 h-px" style={{ background: 'var(--color-primary)' }} />
              <span
                className="label-caps"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-primary)' }}
              >
                Account
              </span>
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1.75rem',
                fontWeight: 700,
                letterSpacing: '-0.025em',
                color: 'var(--color-secondary)',
                marginBottom: '0.5rem',
              }}
            >
              Sign in
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-tertiary)', lineHeight: 1.55 }}>
              Or{' '}
              <button
                type="button"
                onClick={handleContinue}
                className="font-medium underline underline-offset-2 transition-base"
                style={{ color: 'var(--color-primary)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              >
                continue without logging in
              </button>
              {' '}to access the platform.
            </p>
          </div>

          {/* Notice banner */}
          {notice && (
            <div
              className="mb-5 p-4 rounded"
              style={{
                borderRadius: 'var(--radius-md)',
                border: `1px solid ${notice.kind === 'warn' ? '#fcd34d' : '#99f6e4'}`,
                background: notice.kind === 'warn' ? '#fffbeb' : '#f0fdfa',
              }}
            >
              <p
                style={{
                  fontSize: '0.8125rem',
                  lineHeight: 1.6,
                  color: notice.kind === 'warn' ? '#92400e' : 'var(--color-secondary)',
                  fontFamily: 'var(--font-sans)',
                }}
              >
                {notice.msg}
              </p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSignIn} noValidate className="flex flex-col gap-4">

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="login-email"
                style={{
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  color: 'var(--color-text-secondary)',
                  fontFamily: 'var(--font-sans)',
                }}
              >
                Email address
              </label>
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setNotice(null); }}
                placeholder="you@institution.edu"
                style={{
                  width: '100%',
                  padding: '0.625rem 0.875rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border-strong)',
                  background: 'var(--color-surface)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.875rem',
                  color: 'var(--color-text-primary)',
                  outline: 'none',
                  transition: 'border-color 150ms',
                }}
                onFocus={e => e.target.style.borderColor = 'var(--color-border-focus)'}
                onBlur={e => e.target.style.borderColor = 'var(--color-border-strong)'}
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="login-password"
                style={{
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  color: 'var(--color-text-secondary)',
                  fontFamily: 'var(--font-sans)',
                }}
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPass ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={e => { setPassword(e.target.value); setNotice(null); }}
                  placeholder="••••••••"
                  style={{
                    width: '100%',
                    padding: '0.625rem 2.75rem 0.625rem 0.875rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border-strong)',
                    background: 'var(--color-surface)',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.875rem',
                    color: 'var(--color-text-primary)',
                    outline: 'none',
                    transition: 'border-color 150ms',
                  }}
                  onFocus={e => e.target.style.borderColor = 'var(--color-border-focus)'}
                  onBlur={e => e.target.style.borderColor = 'var(--color-border-strong)'}
                />
                <button
                  type="button"
                  aria-label={showPass ? 'Hide password' : 'Show password'}
                  onClick={() => setShowPass(v => !v)}
                  style={{
                    position: 'absolute',
                    right: '0.75rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--color-text-disabled)',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '2px',
                  }}
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Sign in button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 py-2.5 font-semibold text-sm text-white transition-base mt-1"
              style={{
                background: submitting ? 'var(--color-text-disabled)' : 'var(--color-primary)',
                borderRadius: 'var(--radius-md)',
                border: 'none',
                cursor: submitting ? 'not-allowed' : 'pointer',
                fontFamily: 'var(--font-sans)',
                boxShadow: '0 1px 3px rgb(0 0 0 / 0.12)',
              }}
              onMouseEnter={e => { if (!submitting) e.currentTarget.style.background = 'var(--color-primary-dark)'; }}
              onMouseLeave={e => { if (!submitting) e.currentTarget.style.background = 'var(--color-primary)'; }}
            >
              {submitting ? 'Signing in…' : (
                <>Sign in <ArrowRight size={15} /></>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px" style={{ background: 'var(--color-border)' }} />
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-disabled)', fontFamily: 'var(--font-mono)' }}>
              or
            </span>
            <div className="flex-1 h-px" style={{ background: 'var(--color-border)' }} />
          </div>

          {/* Continue without login */}
          <button
            type="button"
            onClick={handleContinue}
            className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-medium transition-base"
            style={{
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border-strong)',
              background: 'var(--color-surface)',
              color: 'var(--color-text-secondary)',
              cursor: 'pointer',
              fontFamily: 'var(--font-sans)',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-primary)'; e.currentTarget.style.color = 'var(--color-primary)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border-strong)'; e.currentTarget.style.color = 'var(--color-text-secondary)'; }}
          >
            Continue without login
            <ArrowRight size={15} />
          </button>

          {/* Research note */}
          <div
            className="mt-6 p-3.5 rounded"
            style={{
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)',
              background: 'var(--color-surface-sunken)',
            }}
          >
            <p
              style={{
                fontSize: '0.75rem',
                lineHeight: 1.6,
                color: 'var(--color-text-tertiary)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              <strong style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>
                UI demonstration only.
              </strong>{' '}
              Authentication is not connected. No credentials are stored or transmitted.
              The platform is freely accessible without an account.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
