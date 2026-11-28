import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { ZOOM_MAX, ZOOM_MIN } from './xaiConfig';

const btn =
  'inline-flex items-center justify-center w-8 h-8 rounded border border-neutral-300 bg-white text-neutral-700 hover:border-teal-600 hover:text-teal-700 transition-base disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-neutral-300 disabled:hover:text-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500';

export default function ZoomControls({ zoom, onZoomIn, onZoomOut, onReset, disabled }) {
  return (
    <div className="flex items-center gap-1.5" role="group" aria-label="Zoom controls">
      <button type="button" className={btn} onClick={onZoomOut} disabled={disabled || zoom <= ZOOM_MIN} aria-label="Zoom out">
        <ZoomOut size={14} aria-hidden="true" />
      </button>
      <span className="w-11 text-center font-mono text-xs text-neutral-700" aria-live="polite">
        {Math.round(zoom * 100)}%
      </span>
      <button type="button" className={btn} onClick={onZoomIn} disabled={disabled || zoom >= ZOOM_MAX} aria-label="Zoom in">
        <ZoomIn size={14} aria-hidden="true" />
      </button>
      <button type="button" className={btn} onClick={onReset} disabled={disabled || zoom === 1} aria-label="Reset zoom">
        <RotateCcw size={14} aria-hidden="true" />
      </button>
    </div>
  );
}
