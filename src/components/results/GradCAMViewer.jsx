import { EyeOff } from 'lucide-react';

/**
 * GradCAMViewer — Visual Explainability panel supporting genuine backend
 * Original, Grad-CAM, and Overlay images. Never fabricates heatmaps.
 */
export default function GradCAMViewer({
  originalImageUrl,
  gradCamUrl,
  overlayUrl,
  gradCamAvailable,
}) {
  const hasAnyImage = Boolean(originalImageUrl || gradCamUrl || overlayUrl);
  const hasExplainability = Boolean(gradCamAvailable && (gradCamUrl || overlayUrl));

  return (
    <section
      aria-labelledby="gradcam-heading"
      className="rounded-xl border border-neutral-200 bg-white p-5 sm:p-6 shadow-sm flex flex-col gap-5"
    >
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <span className="font-mono text-2xs text-neutral-400">03</span>
          <div className="w-3 h-px bg-neutral-300" />
          <span className="font-mono text-2xs uppercase tracking-widest text-teal-700">
            Explainability
          </span>
        </div>
        <h2
          id="gradcam-heading"
          className="text-base sm:text-lg font-bold tracking-tight text-navy-600"
        >
          Visual Explainability
        </h2>
        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-2xl">
          Explore image regions that influenced the model&apos;s prediction using Grad-CAM visualization.
        </p>
      </div>

      {hasExplainability && hasAnyImage ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ImagePanel title="Original Image" src={originalImageUrl} />
          <ImagePanel title="Grad-CAM" src={gradCamUrl} />
          <ImagePanel title="Overlay" src={overlayUrl} />
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-neutral-300 bg-neutral-50 px-6 py-10 flex flex-col items-center justify-center text-center gap-2.5">
          <div className="flex items-center justify-center w-10 h-10 rounded-md border border-neutral-200 bg-white text-neutral-400">
            <EyeOff size={18} aria-hidden="true" />
          </div>
          <p className="text-sm font-medium text-neutral-800">
            Grad-CAM visualization is not available for this analysis.
          </p>
          <p className="text-xs text-neutral-500 max-w-md leading-relaxed">
            Spatial saliency maps are only displayed when returned directly by the backend model
            and are not stored locally in browser history.
          </p>
        </div>
      )}

      <div className="pt-3 border-t border-neutral-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <p className="text-xs text-neutral-600 leading-relaxed">
          Grad-CAM highlights regions of higher gradient activation for interpretability only;
          it is an explanatory visualization, not proof that a prediction is medically correct.
        </p>
      </div>
    </section>
  );
}

function ImagePanel({ title, src }) {
  return (
    <div className="rounded-lg border border-neutral-200 bg-neutral-50 overflow-hidden flex flex-col">
      <div className="px-3.5 py-2 border-b border-neutral-200 bg-white">
        <span className="font-mono text-2xs font-medium uppercase tracking-wider text-neutral-600">
          {title}
        </span>
      </div>
      <div className="p-3 flex items-center justify-center min-h-[180px] max-h-[280px]">
        {src ? (
          <img
            src={src}
            alt={title}
            className="max-w-full max-h-[240px] w-auto h-auto object-contain rounded-sm"
          />
        ) : (
          <span className="font-mono text-2xs text-neutral-400">Unavailable</span>
        )}
      </div>
    </div>
  );
}
