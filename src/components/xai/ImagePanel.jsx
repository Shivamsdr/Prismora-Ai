import { useState } from 'react';
import { ImageOff } from 'lucide-react';

/**
 * Zoomable viewport. Renders `baseUrl`, plus `overlayUrl` on top at `overlayOpacity`.
 * Both layers use object-contain inside the same box so they stay aligned.
 * Zoom enlarges the box inside a scroll container; pan by scrolling.
 */
export default function ImagePanel({ title, note, baseUrl, overlayUrl, overlayOpacity = 60, zoom, alt, onDimensions }) {
  const [failed, setFailed] = useState(false);

  return (
    <figure className="min-w-0 rounded-lg border border-neutral-200 bg-white overflow-hidden flex flex-col">
      <figcaption className="flex items-center justify-between gap-2 px-4 py-2.5 border-b border-neutral-200 bg-neutral-100/70">
        <span className="flex items-center gap-2 min-w-0">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-600 shrink-0" aria-hidden="true" />
          <span className="font-mono text-2xs font-medium uppercase tracking-widest text-neutral-600 truncate">{title}</span>
        </span>
        {note && <span className="font-mono text-2xs text-neutral-400 shrink-0">{note}</span>}
      </figcaption>

      <div className="h-[300px] sm:h-[400px] lg:h-[460px] overflow-auto bg-neutral-50">
        {failed ? (
          <div className="h-full flex flex-col items-center justify-center gap-2 text-neutral-400">
            <ImageOff size={22} aria-hidden="true" />
            <span className="font-mono text-2xs">Image could not be loaded</span>
          </div>
        ) : (
          <div className="relative mx-auto" style={{ width: `${zoom * 100}%`, height: `${zoom * 100}%` }}>
            <img
              src={baseUrl}
              alt={alt}
              draggable={false}
              onLoad={(e) => onDimensions?.({ width: e.currentTarget.naturalWidth, height: e.currentTarget.naturalHeight })}
              onError={() => setFailed(true)}
              className="absolute inset-0 w-full h-full object-contain select-none"
            />
            {overlayUrl && (
              <img
                src={overlayUrl}
                alt=""
                aria-hidden="true"
                draggable={false}
                className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
                style={{ opacity: overlayOpacity / 100 }}
              />
            )}
          </div>
        )}
      </div>
    </figure>
  );
}
