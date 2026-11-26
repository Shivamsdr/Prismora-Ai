import { Link } from 'react-router-dom';
import {
  ArrowRight, FlaskConical, Eye, Clock,
  CheckCircle2, Circle, AlertCircle, ChevronRight,
  RefreshCw, Trash2, FileSearch,
} from 'lucide-react';
import WorkspaceLayout from '@components/layout/WorkspaceLayout';
import ScanThumb       from '@components/dashboard/ScanThumb';
import RetinaThumb     from '@components/dashboard/RetinaThumb';
import useHistory      from '@hooks/useHistory';

/* ═══════════════════════════════════════════════════════════
   DASHBOARD — PRISMORA AI Imaging Research Workspace
═══════════════════════════════════════════════════════════ */

export default function Dashboard() {
  return (
    <WorkspaceLayout>
      <div
        className="content-width py-10 flex flex-col gap-10"
        style={{ maxWidth: '1200px' }}
      >
        <WelcomeSection />
        <ModalityWorkspace />
        <ActivitySection />
        <ResearchStatusSection />
        <DashboardDisclaimer />
      </div>
    </WorkspaceLayout>
  );
}

/* ═══════════════════════════════════════════════════════════
   WELCOME
═══════════════════════════════════════════════════════════ */
function WelcomeSection() {
  return (
    <section className="flex flex-col gap-3">
      {/* Top rule with label */}
      <div className="flex items-center gap-3">
        <div className="w-5 h-px" style={{ background: 'var(--color-primary)' }} />
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            fontWeight: 500,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--color-text-disabled)',
          }}
        >
          Platform Version 1.0 / Research Staging
        </span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              color: 'var(--color-secondary)',
              lineHeight: 1.1,
            }}
          >
            Imaging Research Workspace
          </h1>
          <p
            style={{
              fontSize: '0.9375rem',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.6,
              maxWidth: '58ch',
            }}
          >
            Explore modality-specific medical image analysis workflows in one
            unified research environment.
          </p>
        </div>

        {/* Quick nav pills */}
        <div className="flex flex-wrap gap-2 shrink-0">
          <Link
            to="/analysis/chest"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-base"
            style={{
              background: 'var(--color-primary-subtle)',
              color: 'var(--color-primary-dark)',
              border: '1px solid #99f6e4',
              borderRadius: 'var(--radius-md)',
              fontFamily: 'var(--font-sans)',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#ccfbf1'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--color-primary-subtle)'}
          >
            <FlaskConical size={12} /> Chest X-ray
          </Link>
          <Link
            to="/analysis/retina"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-base"
            style={{
              background: 'var(--color-primary-subtle)',
              color: 'var(--color-primary-dark)',
              border: '1px solid #99f6e4',
              borderRadius: 'var(--radius-md)',
              fontFamily: 'var(--font-sans)',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#ccfbf1'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--color-primary-subtle)'}
          >
            <Eye size={12} /> Retinal Imaging
          </Link>
        </div>
      </div>

      {/* Thin rule */}
      <div className="mt-1" style={{ borderTop: '1px solid var(--color-border)' }} />
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   MODALITY WORKSPACE — two large analysis panels
═══════════════════════════════════════════════════════════ */
function ModalityWorkspace() {
  return (
    <section className="flex flex-col gap-4">
      <SectionLabel index="01" title="Analysis Modules" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <ModalityPanel
          icon={<FlaskConical size={16} />}
          tag="Chest X-Ray"
          index="01"
          title="Chest X-Ray Analysis"
          description="Binary classification of chest radiographs into Normal and Pneumonia categories using convolutional neural networks."
          visual={<ScanThumb />}
          details={[
            { label: 'Task',    value: 'Normal / Pneumonia'          },
            { label: 'Dataset', value: 'Kermany Chest X-Ray'         },
            { label: 'Models',  value: 'DenseNet121 · ResNet50'      },
            { label: 'Input',   value: 'JPG · JPEG · PNG'            },
          ]}
          status="MODEL INTEGRATION PENDING"
          cta="Open chest workspace"
          to="/analysis/chest"
        />

        <ModalityPanel
          icon={<Eye size={16} />}
          tag="Retinal Imaging"
          index="02"
          title="Retinal Imaging Analysis"
          description="Five-grade diabetic retinopathy severity classification from retinal fundus images."
          visual={<RetinaThumb />}
          gradeScale={[
            { label: 'No DR',           color: '#059669' },
            { label: 'Mild',            color: '#0d9488' },
            { label: 'Moderate',        color: '#d97706' },
            { label: 'Severe',          color: '#ea580c' },
            { label: 'Proliferative',   color: '#dc2626' },
          ]}
          details={[
            { label: 'Task',    value: 'DR Severity · 5 Grades'       },
            { label: 'Dataset', value: 'APTOS 2019'                    },
            { label: 'Models',  value: 'EfficientNetB0 · ResNet50'     },
            { label: 'Input',   value: 'JPG · JPEG · PNG'              },
          ]}
          status="MODEL INTEGRATION PENDING"
          cta="Open retinal workspace"
          to="/analysis/retina"
        />
      </div>
    </section>
  );
}

function ModalityPanel({
  icon, tag, index, title, description,
  visual, details, gradeScale, status, cta, to,
}) {
  return (
    <article
      className="flex flex-col gap-0 h-full transition-base"
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-sm)',
        overflow: 'hidden',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = '#99f6e4'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
    >
      {/* Visual thumbnail */}
      <div
        style={{
          borderBottom: '1px solid var(--color-border)',
          overflow: 'hidden',
        }}
      >
        {visual}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 gap-4 p-5">
        {/* Header row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="flex items-center justify-center w-7 h-7"
              style={{
                background: 'var(--color-primary-subtle)',
                color: 'var(--color-primary)',
                borderRadius: 'var(--radius-md)',
              }}
            >
              {icon}
            </div>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--color-primary)',
              }}
            >
              {tag}
            </span>
          </div>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              color: 'var(--color-text-disabled)',
              letterSpacing: '0.08em',
            }}
          >
            {index}
          </span>
        </div>

        {/* Title + description */}
        <div className="flex flex-col gap-1.5">
          <h2
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1.0625rem',
              fontWeight: 700,
              letterSpacing: '-0.015em',
              color: 'var(--color-secondary)',
            }}
          >
            {title}
          </h2>
          <p
            style={{
              fontSize: '0.8125rem',
              lineHeight: 1.6,
              color: 'var(--color-text-secondary)',
            }}
          >
            {description}
          </p>
        </div>

        {/* Grade scale (retinal only) */}
        {gradeScale && (
          <div className="flex flex-col gap-1.5">
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.58rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--color-text-disabled)',
              }}
            >
              Severity Scale
            </span>
            <div className="flex items-center gap-1 flex-wrap">
              {gradeScale.map(({ label, color }, i) => (
                <div key={label} className="flex items-center gap-1">
                  <div
                    className="flex items-center gap-1 px-2 py-0.5 rounded"
                    style={{
                      border: `1px solid ${color}22`,
                      background: `${color}0f`,
                      borderRadius: 'var(--radius-sm)',
                    }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
                    <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color, fontWeight: 500 }}>
                      {label}
                    </span>
                  </div>
                  {i < gradeScale.length - 1 && (
                    <span style={{ fontSize: '0.5rem', color: 'var(--color-text-disabled)' }}>›</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Detail table */}
        <div
          style={{
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
          }}
        >
          {details.map(({ label, value }, i) => (
            <div
              key={label}
              className="flex items-start gap-3 px-3.5 py-2"
              style={{
                borderBottom: i < details.length - 1 ? '1px solid var(--color-border)' : 'none',
                background: i % 2 === 0 ? 'transparent' : 'var(--color-surface-sunken)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--color-text-disabled)',
                  width: '3.5rem',
                  flexShrink: 0,
                  paddingTop: '1px',
                }}
              >
                {label}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.4,
                }}
              >
                {value}
              </span>
            </div>
          ))}
        </div>

        {/* Status badge */}
        <div className="flex items-center gap-2">
          <div
            className="flex items-center gap-1.5 px-2.5 py-1"
            style={{
              background: '#fef3c7',
              border: '1px solid #fcd34d',
              borderRadius: 'var(--radius-md)',
            }}
          >
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#d97706' }} />
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
              {status}
            </span>
          </div>
        </div>

        {/* CTA */}
        <Link
          to={to}
          className="w-full flex items-center justify-center gap-2 py-2.5 mt-auto text-sm font-semibold text-white transition-base"
          style={{
            background: 'var(--color-primary)',
            borderRadius: 'var(--radius-md)',
            fontFamily: 'var(--font-sans)',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--color-primary-dark)'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--color-primary)'}
        >
          {cta}
          <ArrowRight size={15} />
        </Link>
      </div>
    </article>
  );
}

/* ═══════════════════════════════════════════════════════════
   RECENT ACTIVITY — reads from IndexedDB via useHistory
═══════════════════════════════════════════════════════════ */
function ActivitySection() {
  const { sessions, loading, error, refresh } = useHistory();

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <SectionLabel index="02" title="Recent Activity" />
        <button
          onClick={refresh}
          className="flex items-center gap-1.5 text-xs font-medium transition-base"
          style={{ color: 'var(--color-text-tertiary)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)' }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--color-primary)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-tertiary)'}
          aria-label="Refresh activity"
        >
          <RefreshCw size={12} />
          Refresh
        </button>
      </div>

      <div
        style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-sm)',
          overflow: 'hidden',
        }}
      >
        {loading ? (
          <ActivityLoading />
        ) : error ? (
          <ActivityError onRetry={refresh} />
        ) : sessions.length === 0 ? (
          <ActivityEmpty />
        ) : (
          <ActivityList sessions={sessions} />
        )}
      </div>
    </section>
  );
}

function ActivityLoading() {
  return (
    <div className="flex items-center justify-center gap-3 py-14" style={{ color: 'var(--color-text-disabled)' }}>
      <RefreshCw size={16} className="animate-spin" />
      <span style={{ fontSize: '0.875rem', fontFamily: 'var(--font-sans)' }}>Loading session history…</span>
    </div>
  );
}

function ActivityError({ onRetry }) {
  return (
    <div className="flex flex-col items-center gap-3 py-14">
      <AlertCircle size={22} style={{ color: 'var(--color-error)' }} />
      <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
        Could not read session history.
      </p>
      <button
        onClick={onRetry}
        className="text-xs font-medium transition-base"
        style={{ color: 'var(--color-primary)', background: 'none', border: 'none', cursor: 'pointer' }}
      >
        Try again
      </button>
    </div>
  );
}

function ActivityEmpty() {
  return (
    <div className="flex flex-col items-center gap-4 py-16 px-6 text-center">
      <div
        className="flex items-center justify-center w-12 h-12 rounded"
        style={{
          background: 'var(--color-surface-sunken)',
          borderRadius: 'var(--radius-xl)',
          color: 'var(--color-text-disabled)',
        }}
      >
        <FileSearch size={22} />
      </div>
      <div className="flex flex-col gap-1.5">
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.9375rem',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
          }}
        >
          No analyses recorded yet.
        </p>
        <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-tertiary)', maxWidth: '36ch' }}>
          Your completed research sessions will appear here once you submit an image for analysis.
        </p>
      </div>
      <div className="flex flex-wrap gap-2 justify-center mt-1">
        <Link
          to="/analysis/chest"
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white transition-base"
          style={{
            background: 'var(--color-primary)',
            borderRadius: 'var(--radius-md)',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--color-primary-dark)'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--color-primary)'}
        >
          Start an analysis
          <ArrowRight size={12} />
        </Link>
        <Link
          to="/history"
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium transition-base"
          style={{
            border: '1px solid var(--color-border-strong)',
            borderRadius: 'var(--radius-md)',
            color: 'var(--color-text-secondary)',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-primary)'; e.currentTarget.style.color = 'var(--color-primary)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border-strong)'; e.currentTarget.style.color = 'var(--color-text-secondary)'; }}
        >
          View full history
          <ChevronRight size={12} />
        </Link>
      </div>
    </div>
  );
}

const MODALITY_LABELS = { chest: 'Chest X-Ray', retina: 'Retinal Imaging' };
const MODALITY_ICONS  = { chest: FlaskConical, retina: Eye };
const STATUS_STYLES   = {
  complete: { color: '#059669', bg: '#d1fae5', label: 'Complete' },
  pending:  { color: '#d97706', bg: '#fef3c7', label: 'Pending'  },
  error:    { color: '#dc2626', bg: '#fee2e2', label: 'Error'    },
};

function ActivityList({ sessions }) {
  const recent = sessions.slice(0, 8);

  return (
    <div>
      {/* Table header */}
      <div
        className="hidden sm:grid gap-3 px-5 py-2.5"
        style={{
          gridTemplateColumns: '1fr 1fr 1fr 1fr auto',
          borderBottom: '1px solid var(--color-border)',
          background: 'var(--color-surface-sunken)',
        }}
      >
        {['Modality','File','Status','Date',''].map((h, i) => (
          <span key={i} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-disabled)' }}>
            {h}
          </span>
        ))}
      </div>

      {/* Rows */}
      {recent.map((s, i) => {
        const Icon   = MODALITY_ICONS[s.modality]  ?? Clock;
        const status = STATUS_STYLES[s.status] ?? STATUS_STYLES.pending;
        const date   = s.createdAt ? new Date(s.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';

        return (
          <div
            key={s.sessionId}
            className="flex sm:grid items-center gap-3 px-5 py-3 flex-col sm:flex-row"
            style={{
              gridTemplateColumns: '1fr 1fr 1fr 1fr auto',
              borderBottom: i < recent.length - 1 ? '1px solid var(--color-border)' : 'none',
            }}
          >
            {/* Modality */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="flex items-center justify-center w-6 h-6" style={{ background: 'var(--color-primary-subtle)', borderRadius: 'var(--radius-sm)', color: 'var(--color-primary)' }}>
                <Icon size={12} />
              </div>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-primary)', fontFamily: 'var(--font-sans)' }}>
                {MODALITY_LABELS[s.modality] ?? s.modality}
              </span>
            </div>

            {/* Filename */}
            <span
              className="truncate"
              style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-tertiary)', maxWidth: '14rem' }}
              title={s.filename}
            >
              {s.filename ?? '—'}
            </span>

            {/* Status */}
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded w-fit"
              style={{ background: status.bg, borderRadius: 'var(--radius-sm)' }}>
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: status.color }} />
              <span style={{ fontSize: '0.65rem', fontWeight: 600, fontFamily: 'var(--font-mono)', color: status.color, letterSpacing: '0.08em' }}>
                {status.label}
              </span>
            </div>

            {/* Date */}
            <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-disabled)' }}>
              {date}
            </span>

            {/* Link */}
            <Link
              to="/history"
              className="text-xs font-medium transition-base"
              style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-sans)' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--color-primary-dark)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--color-primary)'}
            >
              View
            </Link>
          </div>
        );
      })}

      {/* Footer */}
      <div
        className="flex items-center justify-between px-5 py-3"
        style={{ borderTop: '1px solid var(--color-border)', background: 'var(--color-surface-sunken)' }}
      >
        <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-disabled)' }}>
          {sessions.length} session{sessions.length !== 1 ? 's' : ''} in local storage
        </span>
        <Link
          to="/history"
          className="flex items-center gap-1 text-xs font-medium transition-base"
          style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-sans)' }}
        >
          Full history <ChevronRight size={12} />
        </Link>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   RESEARCH STATUS
═══════════════════════════════════════════════════════════ */
const CAPABILITIES = [
  {
    title:  'Chest X-Ray Classification',
    status: 'pending',
    note:   'Model integration pending.',
  },
  {
    title:  'Retinal Severity Grading',
    status: 'pending',
    note:   'Model integration pending.',
  },
  {
    title:  'Confidence Calibration',
    status: 'proposed',
    note:   'Proposed / under evaluation.',
  },
  {
    title:  'Selective Prediction',
    status: 'proposed',
    note:   'Proposed / under evaluation.',
  },
  {
    title:  'Grad-CAM Explainability',
    status: 'proposed',
    note:   'Proposed / under evaluation.',
  },
];

const CAPABILITY_STATUS = {
  pending:  { icon: Circle,       color: '#d97706', label: 'Integration Pending',    bg: '#fef3c7' },
  proposed: { icon: AlertCircle,  color: '#6c757d', label: 'Proposed',               bg: '#f1f3f5' },
  complete: { icon: CheckCircle2, color: '#059669', label: 'Complete',               bg: '#d1fae5' },
};

function ResearchStatusSection() {
  return (
    <section className="flex flex-col gap-4">
      <SectionLabel index="03" title="Research Capability Status" />

      <div
        style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-sm)',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-3.5"
          style={{ borderBottom: '1px solid var(--color-border)', background: 'var(--color-surface-sunken)' }}
        >
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
            Platform Capabilities
          </span>
          <span
            className="px-2.5 py-0.5 rounded"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#92400e', background: '#fef3c7', border: '1px solid #fcd34d', borderRadius: 'var(--radius-md)' }}
          >
            Research Phase
          </span>
        </div>

        {/* Rows */}
        {CAPABILITIES.map(({ title, status, note }, i) => {
          const cfg  = CAPABILITY_STATUS[status];
          const Icon = cfg.icon;
          return (
            <div
              key={title}
              className="flex items-center gap-4 px-5 py-3.5"
              style={{ borderBottom: i < CAPABILITIES.length - 1 ? '1px solid var(--color-border)' : 'none' }}
            >
              <Icon size={15} style={{ color: cfg.color, flexShrink: 0 }} />
              <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-primary)' }}>
                  {title}
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--color-text-tertiary)' }}>
                  {note}
                </span>
              </div>
              <div
                className="shrink-0 px-2 py-0.5 rounded"
                style={{ background: cfg.bg, borderRadius: 'var(--radius-sm)' }}
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: cfg.color }}>
                  {cfg.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   DISCLAIMER
═══════════════════════════════════════════════════════════ */
function DashboardDisclaimer() {
  return (
    <div
      className="flex items-start gap-4 px-5 py-4"
      style={{
        border: '1px solid var(--color-border)',
        borderLeft: '3px solid var(--color-primary)',
        borderRadius: 'var(--radius-lg)',
        background: 'var(--color-surface)',
      }}
    >
      <span style={{ fontSize: '1rem', flexShrink: 0, marginTop: '1px' }}>⚑</span>
      <p
        style={{
          fontSize: '0.8rem',
          lineHeight: 1.65,
          color: 'var(--color-text-tertiary)',
          fontFamily: 'var(--font-sans)',
        }}
      >
        <strong style={{ color: 'var(--color-text-secondary)', fontWeight: 600 }}>Research Prototype.</strong>{' '}
        PRISMORA AI is a research prototype. Outputs are intended for research and educational
        exploration only and must not be used as a substitute for professional medical evaluation.
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SHARED — Section label component
═══════════════════════════════════════════════════════════ */
function SectionLabel({ index, title }) {
  return (
    <div className="flex items-center gap-2.5">
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6rem',
          fontWeight: 500,
          letterSpacing: '0.1em',
          color: 'var(--color-text-disabled)',
        }}
      >
        {index}
      </span>
      <div className="w-4 h-px" style={{ background: 'var(--color-border-strong)' }} />
      <h2
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.875rem',
          fontWeight: 600,
          letterSpacing: '-0.01em',
          color: 'var(--color-text-secondary)',
          textTransform: 'none',
        }}
      >
        {title}
      </h2>
    </div>
  );
}
