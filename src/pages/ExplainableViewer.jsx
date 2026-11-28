import { useState, useEffect } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import WorkspaceLayout from '@components/layout/WorkspaceLayout';
import ResultsHeader from '@components/results/ResultsHeader';
import ModelInformation from '@components/results/ModelInformation';
import { getSession } from '@services/historyService';
import XAIViewer from '../components/xai/XAIViewer';
import { MODALITIES } from '../components/xai/xaiConfig';

/**
 * /explainability[?id=<sessionId>]
 *
 * Result source, in order:
 *   1. router state:  navigate('/explainability', { state: { result } })  (live result incl. image URLs)
 *   2. local history record matching ?id= (same IndexedDB records the History page lists)
 * Grad-CAM images are not stored in local history, so a record loaded by id will normally show the
 * "backend integration pending" state until the backend supplies them.
 */
export default function ExplainableViewer() {
  const stateResult = useLocation().state?.result ?? null;
  const [params] = useSearchParams();
  const id = params.get('id');

  const [stored, setStored] = useState(null);
  const [loading, setLoading] = useState(Boolean(id && !stateResult));
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    if (!id || stateResult) {
      setLoading(false);
      return undefined;
    }
    let cancelled = false;
    setLoading(true);
    setLoadError(null);
    getSession(id)
      .then((record) => !cancelled && setStored(record))
      .catch((err) => !cancelled && setLoadError(err))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [id, stateResult]);

  const result = stateResult ?? stored ?? null;
  const waiting = !stateResult && id && loading;
  const backId = id ?? result?.sessionId ?? result?.id ?? null;

  const [fallbackModality, setFallbackModality] = useState('chest');
  const modality = result?.modality ?? fallbackModality;

  return (
    <WorkspaceLayout>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col gap-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <span className="font-mono text-2xs uppercase tracking-widest text-teal-700">Explainability</span>
              <div className="w-3 h-px bg-neutral-300" />
              <span className="font-mono text-2xs uppercase tracking-widest text-neutral-500">XAI Viewer</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-navy-600">Visual Explainability Viewer</h1>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-2xl">
              Inspect Grad-CAM model attention alongside the original image.
            </p>
          </div>
          <Link
            to={backId ? `/results?id=${encodeURIComponent(backId)}` : '/results'}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-medium border border-neutral-300 bg-white text-neutral-700 hover:border-teal-600 hover:text-teal-700 transition-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
          >
            <ArrowLeft size={12} aria-hidden="true" /> Back to results
          </Link>
        </div>

        {waiting ? (
          <p role="status" className="font-mono text-xs text-neutral-500">Loading local analysis record…</p>
        ) : (
          <>
            {result ? (
              <ResultsHeader result={result} />
            ) : (
              <div className="flex flex-col gap-3">
                {id && (
                  <p role="status" className="font-mono text-xs text-neutral-600">
                    {loadError
                      ? 'Local analysis history could not be read in this browser.'
                      : `No local record found for ID: ${id}`}
                  </p>
                )}
                <div role="tablist" aria-label="Modality" className="inline-flex self-start gap-1 rounded-md border border-neutral-200 bg-neutral-50 p-1">
                  {Object.entries(MODALITIES).map(([k, m]) => (
                    <button
                      key={k}
                      role="tab"
                      type="button"
                      aria-selected={modality === k}
                      onClick={() => setFallbackModality(k)}
                      className={`px-3 py-1.5 rounded text-xs font-medium transition-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 ${
                        modality === k ? 'bg-navy-600 text-white shadow-xs' : 'text-neutral-600 hover:text-navy-600'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <XAIViewer
              key={`${modality}-${result?.sessionId ?? result?.id ?? 'none'}`}
              modality={modality}
              filename={result?.filename}
              originalImageUrl={result?.originalImageUrl}
              gradCamUrl={result?.gradCamUrl}
              overlayUrl={result?.overlayUrl}
              gradCamAvailable={result?.gradCamAvailable}
            />

            {result && <ModelInformation result={result} />}
          </>
        )}
      </div>
    </WorkspaceLayout>
  );
}
