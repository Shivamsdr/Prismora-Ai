import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Eye, Play, Loader2 } from 'lucide-react';
import WorkspaceLayout from '@components/layout/WorkspaceLayout';
import UploadZone from '@components/upload/UploadZone';
import ImagePreview from '@components/upload/ImagePreview';
import FileDetails from '@components/upload/FileDetails';
import UploadError from '@components/upload/UploadError';
import ModelIntegrationNotice from '@components/upload/ModelIntegrationNotice';
import ModalitySpecCard from '@components/upload/ModalitySpecCard';
import DRGradeReference from '@components/upload/DRGradeReference';
import { useImageUpload } from '@hooks';

const RETINAL_SPECS = [
  { label: 'Modality', value: 'Retinal Fundus' },
  { label: 'Supported formats', value: 'JPG, JPEG, PNG' },
  { label: 'Classification task', value: 'Five-class DR grading' },
  { label: 'Model status', value: 'Awaiting backend integration', highlight: true },
];

export default function RetinalAnalysis() {
  const {
    file,
    previewUrl,
    error,
    hasFile,
    selectFile,
    removeFile,
    clearError,
  } = useImageUpload();

  const fileInputRef = useRef(null);
  const timerRef = useRef(null);

  const [dimensions, setDimensions] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showNotice, setShowNotice] = useState(false);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  function handleSelect(selectedFile) {
    const accepted = selectFile(selectedFile);
    if (accepted) {
      setShowNotice(false);
      setIsAnalyzing(false);
      setDimensions(null);
    }
  }

  function handleReplaceInput(e) {
    const nextFile = e.target.files?.[0];
    if (nextFile) {
      handleSelect(nextFile);
    }
    e.target.value = '';
  }

  function handleRemove() {
    if (timerRef.current) clearTimeout(timerRef.current);
    removeFile();
    setDimensions(null);
    setIsAnalyzing(false);
    setShowNotice(false);
  }

  function handleAnalyse() {
    if (!hasFile || isAnalyzing) return;

    setShowNotice(false);
    setIsAnalyzing(true);

    timerRef.current = setTimeout(() => {
      setIsAnalyzing(false);
      setShowNotice(true);
    }, 550);
  }

  return (
    <WorkspaceLayout>
      <div className="content-width py-8 sm:py-10 flex flex-col gap-8" style={{ maxWidth: '1200px' }}>
        {/* ── Header / Breadcrumb ─────────────────────────────── */}
        <section className="flex flex-col gap-3">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-600 hover:text-teal-600 transition-base w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded"
          >
            <ArrowLeft size={13} aria-hidden="true" />
            Back to Workspace
          </Link>

          <div className="flex items-center gap-2.5 mt-1">
            <div className="w-5 h-px bg-teal-600" />
            <span className="font-mono text-2xs font-medium uppercase tracking-widest text-teal-700">
              Modality 02 · Retinal Fundus
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-navy-600">
              Retinal Fundus Analysis
            </h1>
            <p className="text-sm sm:text-base text-neutral-700 max-w-3xl leading-relaxed">
              Upload a retinal fundus photograph to explore AI-assisted diabetic retinopathy severity grading.
            </p>
          </div>

          <div className="mt-1 border-t border-neutral-200" />
        </section>

        {/* ── Main Two-Column Workspace ───────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left: Upload, Preview & Analyse Controls */}
          <section aria-label="Retinal fundus upload workflow" className="lg:col-span-8 flex flex-col gap-5">
            <input
              ref={fileInputRef}
              type="file"
              accept=".jpg,.jpeg,.png,image/jpeg,image/png"
              onChange={handleReplaceInput}
              className="sr-only"
              tabIndex={-1}
              aria-hidden="true"
            />

            <UploadError message={error} onDismiss={clearError} />

            <div className="rounded-xl border border-neutral-200 bg-white p-5 sm:p-6 shadow-sm flex flex-col gap-5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-2xs text-neutral-400">01</span>
                  <div className="w-3 h-px bg-neutral-300" />
                  <h2 className="text-sm font-semibold text-navy-600">
                    Fundus Photograph Input
                  </h2>
                </div>
                {hasFile && (
                  <span className="font-mono text-2xs uppercase tracking-wider text-teal-700">
                    Image Ready
                  </span>
                )}
              </div>

              {!hasFile ? (
                <UploadZone
                  onFileSelect={handleSelect}
                  modalityName="retinal fundus image"
                />
              ) : (
                <div className="flex flex-col gap-4">
                  <ImagePreview
                    file={file}
                    previewUrl={previewUrl}
                    modalityLabel="Retinal Fundus"
                    onReplace={() => fileInputRef.current?.click()}
                    onRemove={handleRemove}
                    onDimensionsLoad={setDimensions}
                  />
                  <FileDetails file={file} dimensions={dimensions} />
                </div>
              )}

              {/* Action Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 border-t border-neutral-200">
                <p className="font-mono text-2xs text-neutral-500">
                  {hasFile
                    ? 'Ready for local pre-check. No DR grade is generated in this phase.'
                    : 'Select a valid JPG, JPEG, or PNG image (max 10 MB) to enable grading.'}
                </p>

                <button
                  type="button"
                  onClick={handleAnalyse}
                  disabled={!hasFile || isAnalyzing}
                  className={[
                    'inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md text-sm font-semibold transition-base',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2',
                    !hasFile || isAnalyzing
                      ? 'bg-neutral-200 text-neutral-500 cursor-not-allowed'
                      : 'bg-teal-600 text-white hover:bg-teal-700 shadow-xs cursor-pointer',
                  ].join(' ')}
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 size={15} className="animate-spin" aria-hidden="true" />
                      Preparing grading…
                    </>
                  ) : (
                    <>
                      <Play size={14} aria-hidden="true" />
                      Analyse
                    </>
                  )}
                </button>
              </div>
            </div>

            <ModelIntegrationNotice
              visible={showNotice}
              message="Model integration is currently in progress. Retinal grading will become available once the backend and trained model are connected."
              endpoint="POST /api/analyze/retina"
              filename={file?.name}
            />
          </section>

          {/* Right: Modality Specifications + 5-Grade DR Reference */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            <ModalitySpecCard
              icon={Eye}
              tag="Retinal Fundus"
              specs={RETINAL_SPECS}
            />

            <DRGradeReference />

            <div className="rounded-lg border border-neutral-200 border-l-[3px] border-l-teal-600 bg-white p-4">
              <p className="text-xs font-semibold text-navy-600 mb-1">
                Research Prototype Notice
              </p>
              <p className="text-xs leading-relaxed text-neutral-600">
                Uploaded images remain local to your browser session and are not transmitted or stored externally in this phase.
              </p>
            </div>
          </div>
        </div>
      </div>
    </WorkspaceLayout>
  );
}
