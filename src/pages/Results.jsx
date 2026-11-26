import { useState, useEffect } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import {
  ArrowLeft,
  FlaskConical,
  Eye,
  LayoutDashboard,
  Info,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import WorkspaceLayout from '@components/layout/WorkspaceLayout';
import ResultsHeader from '@components/results/ResultsHeader';
import PredictionSummary from '@components/results/PredictionSummary';
import ConfidencePanel from '@components/results/ConfidencePanel';
import ModelInformation from '@components/results/ModelInformation';
import GradCAMViewer from '@components/results/GradCAMViewer';
import { getSession } from '@services/historyService';
import { normalizeAnalysisResult } from '@services/resultService';

/**
 * Results — Medical Analysis Results Interface.
 *
 * Displays genuine normalized backend results when passed via router state
 * or loaded by ?id= from local IndexedDB history. Otherwise renders the
 * honest staging state without fabricating predictions or metrics.
 */
export default function Results() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('id');

  const stateResult = location.state?.result
    ? normalizeAnalysisResult(location.state.result)
    : null;

  const [result, setResult] = useState(stateResult);
  const [loading, setLoading] = useState(Boolean(!stateResult && sessionId));
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    if (stateResult) {
      setResult(stateResult);
      setLoading(false);
      setLoadError(null);
      return;
    }

    if (!sessionId) {
      setResult(null);
      setLoading(false);
      setLoadError(null);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setLoadError(null);

    getSession(sessionId)
      .then((record) => {
        if (cancelled) return;
        const normalized = record ? normalizeAnalysisResult(record) : null;
        setResult(normalized);
        setLoading(false);
      })
      .catch((err) => {
        if (cancelled) return;
        console.error('[Results] Failed to load session from IndexedDB:', err);
        setLoadError(err?.message || 'Could not read stored analysis record.');
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [sessionId, stateResult]);

  return (
    <WorkspaceLayout>
      <div
        className="content-width py-8 sm:py-10 flex flex-col gap-8"
        style={{ maxWidth: '1200px' }}
      >
        {/* Top Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            to={sessionId ? '/history' : '/dashboard'}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-600 hover:text-teal-600 transition-base w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded"
          >
            <ArrowLeft size={13} aria-hidden="true" />
            {sessionId ? 'Back to Analysis History' : 'Back to Workspace'}
          </Link>

          <span className="font-mono text-2xs uppercase tracking-widest text-neutral-500">
            Results Interface · Staging
          </span>
        </div>

        {loading ? (
          <div className="rounded-xl border border-neutral-200 bg-white p-12 flex items-center justify-center gap-3 text-neutral-500 shadow-sm">
            <Loader2 size={18} className="animate-spin text-teal-600" aria-hidden="true" />
            <span className="text-sm">Loading analysis record…</span>
          </div>
        ) : loadError ? (
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 p-6 flex flex-col gap-3"
          >
            <div className="flex items-center gap-2 text-red-800">
              <AlertCircle size={18} aria-hidden="true" />
              <h1 className="text-sm font-semibold">Unable to load analysis record</h1>
            </div>
            <p className="text-xs text-red-700 leading-relaxed">{loadError}</p>
            <div>
              <Link
                to="/history"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-800 underline underline-offset-2"
              >
                Return to Analysis History
              </Link>
            </div>
          </div>
        ) : result ? (
          <>
            <ResultsHeader result={result} />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-7 flex flex-col gap-6">
                <PredictionSummary result={result} />
                <ConfidencePanel confidence={result.confidence} />
              </div>

              <div className="lg:col-span-5 flex flex-col gap-6">
                <ModelInformation result={result} />
              </div>
            </div>

            <GradCAMViewer
              originalImageUrl={result.originalImageUrl}
              gradCamUrl={result.gradCamUrl}
              overlayUrl={result.overlayUrl}
              gradCamAvailable={result.gradCamAvailable}
            />

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to={result.modality === 'retina' ? '/analysis/retina' : '/analysis/chest'}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md text-xs sm:text-sm font-semibold bg-teal-600 text-white hover:bg-teal-700 transition-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
              >
                {result.modality === 'retina' ? (
                  <Eye size={14} aria-hidden="true" />
                ) : (
                  <FlaskConical size={14} aria-hidden="true" />
                )}
                Analyse another image
              </Link>

              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md text-xs sm:text-sm font-medium border border-neutral-300 bg-white text-neutral-800 hover:border-teal-600 hover:text-teal-700 transition-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
              >
                <LayoutDashboard size={14} aria-hidden="true" />
                Return to Dashboard
              </Link>
            </div>
          </>
        ) : (
          <StagingResultsState missingId={sessionId} />
        )}

        <ResultsDisclaimer />
      </div>
    </WorkspaceLayout>
  );
}

function StagingResultsState({ missingId }) {
  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-5 h-px bg-teal-600" />
          <span className="font-mono text-2xs font-medium uppercase tracking-widest text-teal-700">
            Analysis Output · Pending Backend
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-navy-600">
          Analysis Results
        </h1>
        <p className="text-sm sm:text-base text-neutral-700 max-w-2xl leading-relaxed">
          Review classification outcomes, reliability status, confidence scores, and Grad-CAM
          explainability once backend inference is active.
        </p>

        <div className="mt-1 border-t border-neutral-200" />
      </section>

      {/* Main Staging Panel */}
      <section className="rounded-xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-sm flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
          <div className="shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-teal-50 border border-teal-200 text-teal-700">
            <Info size={18} aria-hidden="true" />
          </div>

          <div className="flex-1 flex flex-col gap-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-base sm:text-lg font-bold text-navy-600">
                {missingId
                  ? 'Analysis record not found'
                  : 'Analysis results will appear here once the backend and trained models are connected.'}
              </h2>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-amber-50 border border-amber-300 font-mono text-2xs font-semibold uppercase tracking-wider text-amber-800">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600" aria-hidden="true" />
                Awaiting Inference
              </span>
            </div>

            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-2xl">
              {missingId
                ? `No locally stored analysis record was found for ID "${missingId}". It may have been deleted from local browser storage.`
                : 'The current frontend supports medical image upload and local validation for Chest X-ray and Retinal Fundus inputs, while PyTorch model inference via the FastAPI backend is still pending.'}
            </p>
          </div>
        </div>

        {/* Navigation Actions */}
        <div className="pt-5 border-t border-neutral-200 flex flex-wrap items-center gap-3">
          <Link
            to="/analysis/chest"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md text-xs sm:text-sm font-semibold bg-teal-600 text-white hover:bg-teal-700 transition-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
          >
            <FlaskConical size={14} aria-hidden="true" />
            Back to Chest X-ray Analysis
          </Link>

          <Link
            to="/analysis/retina"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md text-xs sm:text-sm font-medium border border-neutral-300 bg-white text-neutral-800 hover:border-teal-600 hover:text-teal-700 transition-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
          >
            <Eye size={14} aria-hidden="true" />
            Back to Retinal Analysis
          </Link>

          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md text-xs sm:text-sm font-medium border border-neutral-200 bg-neutral-50 text-neutral-700 hover:border-neutral-300 hover:text-navy-600 transition-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
          >
            <LayoutDashboard size={14} aria-hidden="true" />
            Return to Dashboard
          </Link>
        </div>
      </section>

      {/* Supported Output Architecture Preview (no fake data) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            index: '01',
            title: 'Accepted & Abstained States',
            text: 'Distinguishes predictions meeting reliability criteria from abstained cases requiring professional review.',
          },
          {
            index: '02',
            title: 'Confidence & Metadata',
            text: 'Displays model output confidence, architecture, and version returned by the backend without fabricating scores.',
          },
          {
            index: '03',
            title: 'Visual Explainability',
            text: 'Renders original images alongside genuine Grad-CAM heatmaps and overlays when provided by the backend.',
          },
        ].map((item) => (
          <div
            key={item.index}
            className="rounded-xl border border-neutral-200 bg-white p-5 flex flex-col gap-2"
          >
            <span className="font-mono text-2xs text-neutral-400">{item.index}</span>
            <h3 className="text-sm font-semibold text-navy-600">{item.title}</h3>
            <p className="text-xs leading-relaxed text-neutral-600">{item.text}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

function ResultsDisclaimer() {
  return (
    <div className="rounded-lg border border-neutral-200 border-l-[3px] border-l-teal-600 bg-white px-5 py-4">
      <p className="text-xs leading-relaxed text-neutral-600">
        <strong className="font-semibold text-navy-600">Research Prototype Disclaimer.</strong>{' '}
        PRISMORA AI is an academic research prototype and is not clinically validated. Outputs are
        intended solely for research and educational exploration, model confidence is not diagnostic
        certainty, and Grad-CAM visualizations are not proof of medical correctness. Always consult
        a qualified healthcare professional.
      </p>
    </div>
  );
}
