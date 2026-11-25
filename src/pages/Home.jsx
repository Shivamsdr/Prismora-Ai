import { Link } from 'react-router-dom';
import { ArrowRight, FlaskConical, Eye, ChevronRight } from 'lucide-react';
import Navbar from '@components/layout/Navbar';
import Footer from '@components/layout/Footer';
import ScanVisual from '@components/common/ScanVisual';

/* ─────────────────────────────────────────────────────────
   HOME — PRISMORA AI Landing Page
   Phase 2 implementation.
───────────────────────────────────────────────────────── */

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen" style={{ background: 'var(--color-bg)' }}>
      <Navbar />

      <main className="flex-1" style={{ paddingTop: 'var(--navbar-height)' }}>
        <HeroSection />
        <ModalitySection />
        <ResearchPrinciplesSection />
        <DisclaimerSection />
      </main>

      <Footer />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   HERO
══════════════════════════════════════════════════════════ */
function HeroSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        paddingTop: 'clamp(4rem, 10vw, 7rem)',
        paddingBottom: 'clamp(4rem, 10vw, 7rem)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      {/* Subtle warm tint behind */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 70% 50%, rgba(20,184,166,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="content-width relative" style={{ maxWidth: '1200px' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* ── Left: editorial copy ─────────────────────── */}
          <div className="flex flex-col gap-6 lg:pr-8">
            {/* Eyebrow label */}
            <div className="flex items-center gap-2">
              <div
                className="w-6 h-px"
                style={{ background: 'var(--color-primary)' }}
              />
              <span
                className="label-caps"
                style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-mono)' }}
              >
                Research Platform · v1
              </span>
            </div>

            {/* Headline */}
            <h1
              className="text-balance"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
                fontWeight: 700,
                lineHeight: 1.08,
                letterSpacing: '-0.03em',
                color: 'var(--color-secondary)',
              }}
            >
              Intelligent Medical{' '}
              <span style={{ color: 'var(--color-text-primary)' }}>Imaging.</span>
              <br />
              <span style={{ color: 'var(--color-primary)' }}>Built Around</span>{' '}
              Reliability.
            </h1>

            {/* Description */}
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1.0625rem',
                lineHeight: 1.65,
                color: 'var(--color-text-secondary)',
                maxWidth: '44ch',
              }}
            >
              An integrated research platform exploring deep learning for chest X-ray
              classification and retinal disease severity grading, with a focus on
              explainability and reliable predictions.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white transition-base"
                style={{
                  background: 'var(--color-primary)',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: '0 1px 3px rgb(0 0 0 / 0.12)',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--color-primary-dark)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--color-primary)'}
              >
                Explore the platform
                <ArrowRight size={15} />
              </Link>
              <Link
                to="/research"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium transition-base"
                style={{
                  color: 'var(--color-secondary)',
                  border: '1px solid var(--color-border-strong)',
                  borderRadius: 'var(--radius-md)',
                  background: 'transparent',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-primary)'; e.currentTarget.style.color = 'var(--color-primary)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border-strong)'; e.currentTarget.style.color = 'var(--color-secondary)'; }}
              >
                Explore our research
              </Link>
            </div>

            {/* Technical metadata strip */}
            <div
              className="flex flex-wrap items-center gap-x-5 gap-y-1.5 pt-2"
              style={{ borderTop: '1px solid var(--color-border)' }}
            >
              {[
                ['Modalities', 'Chest X-Ray · Retinal'],
                ['Framework', 'PyTorch'],
                ['Phase', 'Research'],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center gap-1.5 pt-3">
                  <span
                    className="text-2xs font-medium tracking-caps uppercase"
                    style={{ color: 'var(--color-text-disabled)', fontFamily: 'var(--font-mono)' }}
                  >
                    {k}
                  </span>
                  <span
                    className="text-xs"
                    style={{ color: 'var(--color-text-tertiary)', fontFamily: 'var(--font-mono)' }}
                  >
                    {v}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: scientific visual ─────────────────── */}
          <div className="flex justify-center lg:justify-end">
            <div
              className="relative"
              style={{
                padding: '1px',
                borderRadius: 'var(--radius-lg)',
                background: 'linear-gradient(135deg, #e9ecef 0%, #dee2e6 100%)',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              <div
                style={{
                  borderRadius: 'calc(var(--radius-lg) - 1px)',
                  overflow: 'hidden',
                  background: 'var(--color-surface)',
                }}
              >
                <ScanVisual />
              </div>
              {/* Caption */}
              <div
                className="absolute -bottom-7 right-0"
                style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--color-text-disabled)' }}
              >
                Schematic representation — no real patient data
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   MODALITY SECTION
══════════════════════════════════════════════════════════ */
function ModalitySection() {
  return (
    <section
      className="section"
      style={{ paddingTop: 'clamp(3.5rem,8vw,5.5rem)', paddingBottom: 'clamp(3.5rem,8vw,5.5rem)' }}
    >
      <div className="content-width" style={{ maxWidth: '1200px' }}>

        {/* Section header */}
        <div className="flex flex-col gap-3 mb-10 lg:mb-12">
          <div className="flex items-center gap-2">
            <div className="w-6 h-px" style={{ background: 'var(--color-border-strong)' }} />
            <span className="label-caps" style={{ fontFamily: 'var(--font-mono)' }}>
              Research Modules
            </span>
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(1.6rem, 3.5vw, 2.25rem)',
              fontWeight: 700,
              letterSpacing: '-0.025em',
              color: 'var(--color-secondary)',
            }}
          >
            Two Imaging Modalities
          </h2>
          <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-secondary)', maxWidth: '52ch', lineHeight: 1.6 }}>
            PRISMORA explores classification and grading tasks across two distinct medical imaging domains.
          </p>
        </div>

        {/* Two module cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ModalityCard
            icon={<FlaskConical size={18} />}
            tag="Chest X-Ray"
            index="01"
            title="Thoracic Radiograph Classification"
            task="Binary classification of chest radiographs."
            details={[
              { label: 'Task',       value: 'Normal / Pneumonia'              },
              { label: 'Dataset',    value: 'Kermany Chest X-Ray Dataset'     },
              { label: 'Models',     value: 'DenseNet121 · ResNet50'          },
              { label: 'Input',      value: '224 × 224 px · Grayscale'        },
            ]}
            cta="Explore chest analysis"
            to="/analysis/chest"
          />
          <ModalityCard
            icon={<Eye size={18} />}
            tag="Retinal Imaging"
            index="02"
            title="Diabetic Retinopathy Severity Grading"
            task="Five-grade severity classification of retinal fundus images."
            details={[
              { label: 'Task',       value: 'DR Severity Grading · 5 Grades'  },
              { label: 'Grades',     value: 'No DR · Mild · Moderate · Severe · Proliferative' },
              { label: 'Dataset',    value: 'APTOS 2019 Blindness Detection'   },
              { label: 'Models',     value: 'EfficientNetB0 · ResNet50'        },
            ]}
            cta="Explore retinal analysis"
            to="/analysis/retina"
          />
        </div>
      </div>
    </section>
  );
}

function ModalityCard({ icon, tag, index, title, task, details, cta, to }) {
  return (
    <div
      className="flex flex-col gap-5 p-7 transition-base"
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-sm)',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-primary)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
    >
      {/* Card header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2.5">
          <div
            className="flex items-center justify-center w-8 h-8 rounded"
            style={{ background: 'var(--color-primary-subtle)', color: 'var(--color-primary)', borderRadius: 'var(--radius-md)' }}
          >
            {icon}
          </div>
          <span
            className="label-caps"
            style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-mono)' }}
          >
            {tag}
          </span>
        </div>
        <span
          className="text-2xs font-medium"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-disabled)', letterSpacing: '0.08em' }}
        >
          {index}
        </span>
      </div>

      {/* Title + task */}
      <div className="flex flex-col gap-1.5">
        <h3
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '1.125rem',
            fontWeight: 700,
            letterSpacing: '-0.015em',
            color: 'var(--color-secondary)',
          }}
        >
          {title}
        </h3>
        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.55 }}>
          {task}
        </p>
      </div>

      {/* Detail rows */}
      <div
        className="flex flex-col gap-0 rounded"
        style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}
      >
        {details.map(({ label, value }, i) => (
          <div
            key={label}
            className="flex items-start gap-3 px-4 py-2.5"
            style={{
              borderBottom: i < details.length - 1 ? '1px solid var(--color-border)' : 'none',
              background: i % 2 === 0 ? 'transparent' : 'var(--color-surface-sunken)',
            }}
          >
            <span
              className="shrink-0 w-16 text-2xs uppercase tracking-wide font-medium"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-disabled)', paddingTop: '1px' }}
            >
              {label}
            </span>
            <span
              className="text-xs leading-relaxed"
              style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-mono)' }}
            >
              {value}
            </span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <Link
        to={to}
        className="inline-flex items-center gap-1.5 mt-auto text-sm font-medium transition-base group"
        style={{ color: 'var(--color-primary)' }}
        onMouseEnter={e => e.currentTarget.style.color = 'var(--color-primary-dark)'}
        onMouseLeave={e => e.currentTarget.style.color = 'var(--color-primary)'}
      >
        {cta}
        <ChevronRight size={15} className="group-hover:translate-x-0.5 transition-base" />
      </Link>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   RESEARCH PRINCIPLES
══════════════════════════════════════════════════════════ */
const PRINCIPLES = [
  {
    index: '01',
    title: 'Modality-Aware Input Validation',
    body:
      'Proposed preprocessing pipeline to verify that uploaded images correspond to the expected imaging modality before inference, reducing erroneous predictions from mismatched inputs.',
  },
  {
    index: '02',
    title: 'Confidence Calibration',
    body:
      'Exploration of temperature scaling and isotonic regression to align model output probabilities with true empirical accuracy, targeting reliable uncertainty estimates.',
  },
  {
    index: '03',
    title: 'Selective Prediction',
    body:
      'Abstention mechanism under investigation — when prediction confidence falls below a defined threshold, the system will defer rather than produce a low-confidence output.',
  },
  {
    index: '04',
    title: 'Grad-CAM Explainability',
    body:
      'Gradient-weighted Class Activation Mapping to generate spatial saliency overlays identifying which image regions most influenced each classification decision.',
  },
];

function ResearchPrinciplesSection() {
  return (
    <section
      style={{
        paddingTop: 'clamp(3.5rem,8vw,5.5rem)',
        paddingBottom: 'clamp(3.5rem,8vw,5.5rem)',
        background: 'var(--color-surface)',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <div className="content-width" style={{ maxWidth: '1200px' }}>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">

          {/* Left label col */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-px" style={{ background: 'var(--color-border-strong)' }} />
              <span className="label-caps" style={{ fontFamily: 'var(--font-mono)' }}>
                Research Objectives
              </span>
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(1.6rem,3.5vw,2.25rem)',
                fontWeight: 700,
                letterSpacing: '-0.025em',
                color: 'var(--color-secondary)',
                lineHeight: 1.15,
              }}
            >
              Core Research Directions
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-tertiary)', lineHeight: 1.65 }}>
              These are proposed capabilities and active areas of investigation.
              None are deployed as clinical features.
            </p>
            {/* Prominent "Research" badge */}
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1 mt-1 w-fit rounded"
              style={{
                border: '1px solid #d97706',
                background: '#fef3c7',
                borderRadius: 'var(--radius-md)',
              }}
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#d97706' }} />
              <span
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#d97706',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                Proposed · Under Evaluation
              </span>
            </div>
          </div>

          {/* Right principles grid */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {PRINCIPLES.map(({ index, title, body }) => (
              <div
                key={index}
                className="flex flex-col gap-3 p-5 rounded"
                style={{
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-lg)',
                  background: 'var(--color-bg)',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    fontWeight: 500,
                    letterSpacing: '0.08em',
                    color: 'var(--color-text-disabled)',
                  }}
                >
                  {index}
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.9375rem',
                    fontWeight: 600,
                    letterSpacing: '-0.01em',
                    color: 'var(--color-secondary)',
                    lineHeight: 1.3,
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    fontSize: '0.8125rem',
                    lineHeight: 1.65,
                    color: 'var(--color-text-tertiary)',
                  }}
                >
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   DISCLAIMER
══════════════════════════════════════════════════════════ */
function DisclaimerSection() {
  return (
    <section
      style={{
        paddingTop: 'clamp(2.5rem,6vw,4rem)',
        paddingBottom: 'clamp(2.5rem,6vw,4rem)',
      }}
    >
      <div className="content-width" style={{ maxWidth: '1200px' }}>
        <div
          className="flex flex-col sm:flex-row items-start sm:items-center gap-5 p-6 rounded"
          style={{
            border: '1px solid #e9ecef',
            borderLeft: '3px solid #0d9488',
            borderRadius: 'var(--radius-lg)',
            background: 'var(--color-surface)',
          }}
        >
          <div
            className="shrink-0 flex items-center justify-center w-9 h-9 rounded"
            style={{
              background: 'var(--color-primary-subtle)',
              color: 'var(--color-primary)',
              borderRadius: 'var(--radius-md)',
              fontSize: '1rem',
            }}
          >
            ⚑
          </div>
          <div>
            <p
              className="font-semibold mb-1"
              style={{ fontSize: '0.875rem', color: 'var(--color-secondary)' }}
            >
              Research Prototype — Not a Clinical Tool
            </p>
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-tertiary)', lineHeight: 1.65 }}>
              PRISMORA AI is an academic research prototype under active development. All models are
              experimental and have not been clinically validated. Outputs must not be used for
              clinical diagnosis, patient management, or any medical decision-making purpose.
              This platform is intended solely for research exploration and demonstration.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
