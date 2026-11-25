import { useState, useEffect } from 'react';
import { RefreshCw, Trash2 } from 'lucide-react';

/**
 * ImagePreview — Renders the selected image inside a restrained clinical
 * viewport frame, preserving aspect ratio without stretching or distortion.
 */
export default function ImagePreview({
  file,
  previewUrl,
  modalityLabel,
  onReplace,
  onRemove,
  onDimensionsLoad,
}) {
  const [dimensions, setDimensions] = useState(null);

  useEffect(() => {
    setDimensions(null);
  }, [previewUrl]);

  if (!file || !previewUrl) return null;

  function handleImageLoad(e) {
    const dims = {
      width: e.currentTarget.naturalWidth,
      height: e.currentTarget.naturalHeight,
    };
    setDimensions(dims);
    if (onDimensionsLoad) {
      onDimensionsLoad(dims);
    }
  }

  return (
    <div className="rounded-lg border border-neutral-200 bg-white overflow-hidden">
      {/* Viewport Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 border-b border-neutral-200 bg-neutral-100/70">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-600" aria-hidden="true" />
          <span className="font-mono text-2xs font-medium uppercase tracking-widest text-neutral-600">
            {modalityLabel} · Input Preview
          </span>
          {dimensions && (
            <span className="font-mono text-2xs text-neutral-400">
              ({dimensions.width} × {dimensions.height})
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onReplace}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium border border-neutral-300 bg-white text-neutral-700 hover:border-teal-600 hover:text-teal-700 transition-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
          >
            <RefreshCw size={12} aria-hidden="true" />
            Replace
          </button>
          <button
            type="button"
            onClick={onRemove}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium border border-neutral-300 bg-white text-neutral-700 hover:border-red-400 hover:text-red-700 hover:bg-red-50 transition-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
          >
            <Trash2 size={12} aria-hidden="true" />
            Remove
          </button>
        </div>
      </div>

      {/* Image Container — preserves aspect ratio, prevents overflow or stretching */}
      <div className="relative flex items-center justify-center p-4 sm:p-6 bg-neutral-50 min-h-[240px] max-h-[420px]">
        <img
          src={previewUrl}
          alt={`Selected ${modalityLabel.toLowerCase()} preview: ${file.name}`}
          onLoad={handleImageLoad}
          className="max-w-full max-h-[360px] w-auto h-auto object-contain rounded-sm border border-neutral-200 bg-white shadow-xs"
        />
      </div>
    </div>
  );
}
