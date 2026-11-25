/**
 * ScanThumb — compact chest X-ray schematic for dashboard modality panels.
 * Smaller, horizontally oriented variant of ScanVisual.
 */
export default function ScanThumb() {
  return (
    <div
      className="relative w-full select-none"
      style={{ aspectRatio: '16/9', maxWidth: '100%' }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Panel */}
        <rect x="2" y="2" width="316" height="176" rx="2" fill="#f8f9fa" stroke="#dee2e6" strokeWidth="0.75" />

        {/* Grid */}
        {[48,96,144,192,240,288].map(x => (
          <line key={`v${x}`} x1={x} y1="2" x2={x} y2="178" stroke="#e9ecef" strokeWidth="0.5" />
        ))}
        {[36,72,108,144].map(y => (
          <line key={`h${y}`} x1="2" y1={y} x2="318" y2={y} stroke="#e9ecef" strokeWidth="0.5" />
        ))}

        {/* Corner marks */}
        {[[18,16],[302,16],[18,164],[302,164]].map(([cx,cy],i) => (
          <g key={i}>
            <line x1={cx-7} y1={cy} x2={cx+7} y2={cy} stroke="#adb5bd" strokeWidth="0.75" />
            <line x1={cx} y1={cy-7} x2={cx} y2={cy+7} stroke="#adb5bd" strokeWidth="0.75" />
          </g>
        ))}

        {/* Scan region dashes */}
        <rect x="52" y="22" width="216" height="136" rx="1"
          fill="none" stroke="#ced4da" strokeWidth="0.75" strokeDasharray="3 2" />

        {/* Left lobe */}
        <ellipse cx="130" cy="90" rx="40" ry="56"
          fill="none" stroke="#c5d5e8" strokeWidth="1" opacity="0.85" />
        {/* Right lobe */}
        <ellipse cx="195" cy="89" rx="43" ry="57"
          fill="none" stroke="#c5d5e8" strokeWidth="1" opacity="0.85" />
        {/* Mediastinum */}
        <rect x="157" y="34" width="20" height="112" rx="3"
          fill="none" stroke="#c5d5e8" strokeWidth="0.75" opacity="0.6" />

        {/* Scan sweep line */}
        <rect x="52" y="85" width="216" height="1.5" rx="1" fill="#14b8a6" opacity="0.2" />

        {/* Crosshair */}
        <circle cx="162" cy="90" r="12" stroke="#0d9488" strokeWidth="0.6" strokeDasharray="2.5 2" fill="none" opacity="0.5" />
        <line x1="162" y1="78" x2="162" y2="102" stroke="#0d9488" strokeWidth="0.6" opacity="0.5" />
        <line x1="150" y1="90" x2="174" y2="90" stroke="#0d9488" strokeWidth="0.6" opacity="0.5" />

        {/* Annotation dots */}
        {[[118,60,'#0d9488',0.6],[200,55,'#0d9488',0.4],[135,122,'#14b8a6',0.5]].map(([cx,cy,s,o],i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r="3.5" fill="none" stroke={s} strokeWidth="0.75" opacity={o} />
            <circle cx={cx} cy={cy} r="1" fill={s} opacity={o} />
          </g>
        ))}

        {/* Status bar */}
        <rect x="2" y="158" width="316" height="20" fill="#f1f3f5" />
        <line x1="2" y1="158" x2="318" y2="158" stroke="#dee2e6" strokeWidth="0.5" />
        <text x="12" y="172" fontFamily="'JetBrains Mono',monospace" fontSize="6" fill="#adb5bd" letterSpacing="0.5">
          CHEST · PA VIEW
        </text>
        <text x="308" y="172" textAnchor="end" fontFamily="'JetBrains Mono',monospace" fontSize="6" fill="#0d9488" letterSpacing="0.5">
          AWAITING INPUT
        </text>
      </svg>
    </div>
  );
}
