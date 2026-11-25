import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home            from '@pages/Home';
import Login           from '@pages/Login';
import Dashboard       from '@pages/Dashboard';
import ChestAnalysis   from '@pages/ChestAnalysis';
import RetinalAnalysis from '@pages/RetinalAnalysis';
import Results         from '@pages/Results';
import History         from '@pages/History';
import Research        from '@pages/Research';
import About           from '@pages/About';

/**
 * AppRouter
 *
 * Central routing configuration for PRISMORA AI.
 * No authentication guards in this phase — all routes are publicly accessible.
 * Route protection and role-based access will be introduced in a later phase.
 */
export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ── Public routes ─────────────────────────── */}
        <Route path="/"                  element={<Home />} />
        <Route path="/login"             element={<Login />} />
        <Route path="/about"             element={<About />} />
        <Route path="/research"          element={<Research />} />

        {/* ── Application routes ────────────────────── */}
        <Route path="/dashboard"         element={<Dashboard />} />
        <Route path="/analysis/chest"    element={<ChestAnalysis />} />
        <Route path="/analysis/retina"   element={<RetinalAnalysis />} />
        <Route path="/results"           element={<Results />} />
        <Route path="/history"           element={<History />} />

        {/* ── 404 fallback ──────────────────────────── */}
        <Route path="*"                  element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

/**
 * NotFound — inline 404 placeholder.
 * Will be replaced with a full designed page in a later phase.
 */
function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        fontFamily: 'var(--font-sans)',
        color: 'var(--color-text-secondary)',
        background: 'var(--color-bg)',
      }}
    >
      <span style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-tertiary)' }}>
        PRISMORA AI
      </span>
      <h1 style={{ fontSize: '3rem', fontWeight: 700, color: 'var(--color-text-primary)', letterSpacing: '-0.03em', margin: 0 }}>
        404
      </h1>
      <p style={{ margin: 0 }}>This page does not exist.</p>
      <a href="/" style={{ color: 'var(--color-primary)', fontSize: '0.875rem', fontWeight: 500 }}>
        Return home →
      </a>
    </div>
  );
}
