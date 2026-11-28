import { useState, useCallback } from 'react';
import { MODALITIES, ZOOM_MAX, ZOOM_MIN, ZOOM_STEP } from './xaiConfig';
import ViewModeTabs from './ViewModeTabs';
import OpacitySlider from './OpacitySlider';
import ZoomControls from './ZoomControls';
import ImagePanel from './ImagePanel';
import ImageInfoPanel from './ImageInfoPanel';
import ExplanationPanel from './ExplanationPanel';
import XAIUnavailable from './XAIUnavailable';

/**
 * XAIViewer — props mirror GradCAMViewer so backend data can be passed straight through:
 * modality ('chest' | 'retina'), originalImageUrl, gradCamUrl, overlayUrl, gradCamAvailable, filename.
 * Overlay view blends originalImageUrl + gradCamUrl client-side (display only) so opacity is adjustable;
 * if gradCamUrl is missing it falls back to the backend-supplied overlayUrl (fixed opacity).
 */
export default function XAIViewer({ modality = 'chest', originalImageUrl, gradCamUrl, overlayUrl, gradCamAvailable, filename }) {
  const cfg = MODALITIES[modality] ?? MODALITIES.chest;
  const key = MODALITIES[modality] ? modality : 'chest';

  const [mode, setMode] = useState('overlay');
  const [opacity, setOpacity] = useState(60);
  const [zoom, setZoom] = useState(1);
  const [dims, setDims] = useState(null);

  const clamp = (z) => Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, z));
  const zoomIn = useCallback(() => setZoom((z) => clamp(z + ZOOM_STEP)), []);
  const zoomOut = useCallback(() => setZoom((z) => clamp(z - ZOOM_STEP)), []);
  const reset = useCallback(() => setZoom(1), []);

  const hasExplainability = Boolean(gradCamAvailable && (gradCamUrl || overlayUrl));
  const canBlend = Boolean(originalImageUrl && gradCamUrl);
  const overlayBase = canBlend ? originalImageUrl : overlayUrl;
  const overlayTop = canBlend ? gradCamUrl : undefined;

  const availability = {
    overlay: Boolean(overlayBase),
    side: Boolean(originalImageUrl && overlayBase),
    original: Boolean(originalImageUrl),
    heatmap: Boolean(gradCamUrl),
  };
  const activeMode = availability[mode] ? mode : Object.keys(availability).find((k) => availability[k]);

  const aside = (
    <aside className="grid content-start gap-4 md:grid-cols-2 xl:grid-cols-1">
      <ImageInfoPanel
        modalityLabel={cfg.label}
        filename={filename}
        dimensions={dims}
        layers={{ original: originalImageUrl, gradCam: gradCamUrl, overlay: overlayUrl }}
      />
      <ExplanationPanel modality={key} />
    </aside>
  );

  if (!hasExplainability || !activeMode) {
    return (
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px] items-start">
        <XAIUnavailable modalityLabel={cfg.label} />
        {aside}
      </div>
    );
  }

  const alt = `${cfg.label} ${cfg.noun}`;
  const original = <ImagePanel key="o" title="Original Image" baseUrl={originalImageUrl} zoom={zoom} alt={alt} onDimensions={setDims} />;
  const heatmap = <ImagePanel key="h" title="Grad-CAM" baseUrl={gradCamUrl} zoom={zoom} alt={`Grad-CAM heatmap for ${alt}`} />;
  const overlay = (
    <ImagePanel
      key="v"
      title="Overlay"
      note={canBlend ? `${opacity}%` : 'Backend overlay'}
      baseUrl={overlayBase}
      overlayUrl={overlayTop}
      overlayOpacity={opacity}
      zoom={zoom}
      alt={`${alt} with Grad-CAM overlay`}
      onDimensions={originalImageUrl ? undefined : setDims}
    />
  );
  const panels = { overlay: [overlay], side: [original, overlay], original: [original], heatmap: [heatmap] }[activeMode];
  const opacityActive = canBlend && (activeMode === 'overlay' || activeMode === 'side');

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-xl border border-neutral-200 bg-white p-3 sm:p-4 shadow-sm flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <ViewModeTabs mode={activeMode} onChange={setMode} availability={availability} />
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <OpacitySlider value={opacity} onChange={setOpacity} disabled={!opacityActive} />
          <ZoomControls zoom={zoom} onZoomIn={zoomIn} onZoomOut={zoomOut} onReset={reset} />
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px] items-start">
        <div className={`grid items-start gap-4 ${panels.length > 1 ? 'md:grid-cols-2' : ''}`}>{panels}</div>
        {aside}
      </div>
    </div>
  );
}
