/**
 * ScanVisual — Original CSS/SVG scientific visual for the hero section.
 *
 * Represents the concept of medical image analysis through:
 * - A schematic scan viewport frame
 * - Fine coordinate grid lines
 * - Scan-inspired pattern overlays
 * - Technical annotation labels (JetBrains Mono)
 * - Restrained teal accent marks
 *
 * Does NOT show or imply any AI prediction, X-ray image, or retinal scan result.
 */
export default function ScanVisual() {
  return (
    <div
      className="relative w-full select-none"
      style={{ aspectRatio: '4/4.2', maxWidth: '420px' }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 420 440"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* ── Background panel ───────────────────────────────── */}
        <rect x="12" y="12" width="396" height="416" rx="2"
          fill="#f8f9fa" stroke="#dee2e6" strokeWidth="1" />

        {/* ── Fine coordinate grid ────────────────────────────── */}
        {/* Vertical lines */}
        {[60,110,160,210,260,310,360].map(x => (
          <line key={`v${x}`} x1={x} y1="12" x2={x} y2="428"
            stroke="#e9ecef" strokeWidth="0.75" />
        ))}
        {/* Horizontal lines */}
        {[60,110,160,210,260,310,360,410].map(y => (
          <line key={`h${y}`} x1="12" y1={y} x2="408" y2={y}
            stroke="#e9ecef" strokeWidth="0.75" />
        ))}

        {/* ── Corner registration marks ─────────────────────── */}
        {[
          [30,30], [390,30], [30,398], [390,398]
        ].map(([cx, cy], i) => (
          <g key={i}>
            <line x1={cx-10} y1={cy} x2={cx+10} y2={cy} stroke="#adb5bd" strokeWidth="1" />
            <line x1={cx} y1={cy-10} x2={cx} y2={cy+10} stroke="#adb5bd" strokeWidth="1" />
          </g>
        ))}

        {/* ── Central scan region ───────────────────────────── */}
        <rect x="80" y="70" width="260" height="280" rx="1"
          fill="none" stroke="#ced4da" strokeWidth="1" strokeDasharray="4 3" />

        {/* ── Scan region inner overlay — lung field schematic ─ */}
        {/* Left lobe silhouette */}
        <ellipse cx="160" cy="210" rx="52" ry="90"
          fill="none" stroke="#c5d5e8" strokeWidth="1.25" opacity="0.8" />
        {/* Right lobe silhouette */}
        <ellipse cx="260" cy="208" rx="56" ry="92"
          fill="none" stroke="#c5d5e8" strokeWidth="1.25" opacity="0.8" />
        {/* Mediastinum suggestion */}
        <rect x="197" y="118" width="26" height="180" rx="4"
          fill="none" stroke="#c5d5e8" strokeWidth="1" opacity="0.6" />

        {/* ── Scan line (raster sweep effect) ───────────────── */}
        <rect x="80" y="192" width="260" height="2" rx="1"
          fill="#14b8a6" opacity="0.18" />
        <rect x="80" y="193" width="260" height="1" rx="0"
          fill="#14b8a6" opacity="0.08" />

        {/* ── Teal accent measurement lines ─────────────────── */}
        {/* Top span */}
        <line x1="80" y1="58" x2="340" y2="58" stroke="#0d9488" strokeWidth="0.75" />
        <line x1="80" y1="54" x2="80" y2="62" stroke="#0d9488" strokeWidth="0.75" />
        <line x1="340" y1="54" x2="340" y2="62" stroke="#0d9488" strokeWidth="0.75" />
        <text x="210" y="52" textAnchor="middle" fontFamily="'JetBrains Mono',monospace"
          fontSize="8" fill="#0d9488" letterSpacing="0.5">260 × 280 px</text>

        {/* Left span */}
        <line x1="58" y1="70" x2="58" y2="350" stroke="#0d9488" strokeWidth="0.75" />
        <line x1="54" y1="70" x2="62" y2="70" stroke="#0d9488" strokeWidth="0.75" />
        <line x1="54" y1="350" x2="62" y2="350" stroke="#0d9488" strokeWidth="0.75" />
        <text x="38" y="215" textAnchor="middle" fontFamily="'JetBrains Mono',monospace"
          fontSize="8" fill="#0d9488" transform="rotate(-90,38,215)" letterSpacing="0.5">ROI</text>

        {/* ── Focal cross-hair ──────────────────────────────── */}
        <circle cx="210" cy="210" r="18" stroke="#0d9488" strokeWidth="0.75"
          strokeDasharray="3 3" fill="none" opacity="0.5" />
        <line x1="210" y1="192" x2="210" y2="228" stroke="#0d9488" strokeWidth="0.75" opacity="0.5" />
        <line x1="192" y1="210" x2="228" y2="210" stroke="#0d9488" strokeWidth="0.75" opacity="0.5" />

        {/* ── Annotation dots — region proposals ────────────── */}
        {[
          [152, 155, '#0d9488', 0.7],
          [265, 148, '#0d9488', 0.5],
          [178, 270, '#0d9488', 0.4],
          [248, 272, '#14b8a6', 0.5],
        ].map(([cx, cy, stroke, op], i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r="5" fill="none" stroke={stroke} strokeWidth="1" opacity={op} />
            <circle cx={cx} cy={cy} r="1.5" fill={stroke} opacity={op} />
          </g>
        ))}

        {/* ── Side annotation panel ─────────────────────────── */}
        <rect x="352" y="70" width="44" height="280" rx="1"
          fill="#f1f3f5" stroke="#dee2e6" strokeWidth="0.75" />

        {/* Annotation rows */}
        {[
          ['CH', '01'],
          ['RL', 'L'],
          ['RR', 'R'],
          ['SL', '00'],
          ['MD', '--'],
          ['GD', '--'],
        ].map(([k, v], i) => (
          <g key={k}>
            <text x="374" y={91 + i * 42} textAnchor="middle"
              fontFamily="'JetBrains Mono',monospace" fontSize="6.5"
              fill="#adb5bd" letterSpacing="0.4">{k}</text>
            <text x="374" y={103 + i * 42} textAnchor="middle"
              fontFamily="'JetBrains Mono',monospace" fontSize="8"
              fill="#6c757d" letterSpacing="0.4">{v}</text>
            {i < 5 && <line x1="356" y1={112 + i * 42} x2="394" y2={112 + i * 42}
              stroke="#e9ecef" strokeWidth="0.5" />}
          </g>
        ))}

        {/* ── Bottom status bar ─────────────────────────────── */}
        <rect x="12" y="384" width="396" height="44" rx="0"
          fill="#f1f3f5" stroke="none" />
        <line x1="12" y1="384" x2="408" y2="384" stroke="#dee2e6" strokeWidth="0.75" />

        <text x="28" y="400" fontFamily="'JetBrains Mono',monospace"
          fontSize="7" fill="#adb5bd" letterSpacing="0.6">MODALITY</text>
        <text x="28" y="414" fontFamily="'JetBrains Mono',monospace"
          fontSize="8.5" fill="#6c757d" letterSpacing="0.4">CHEST · PA VIEW</text>

        <text x="210" y="400" textAnchor="middle" fontFamily="'JetBrains Mono',monospace"
          fontSize="7" fill="#adb5bd" letterSpacing="0.6">STATUS</text>
        <text x="210" y="414" textAnchor="middle" fontFamily="'JetBrains Mono',monospace"
          fontSize="8.5" fill="#0d9488" letterSpacing="0.4">AWAITING INPUT</text>

        <text x="392" y="400" textAnchor="end" fontFamily="'JetBrains Mono',monospace"
          fontSize="7" fill="#adb5bd" letterSpacing="0.6">PLATFORM</text>
        <text x="392" y="414" textAnchor="end" fontFamily="'JetBrains Mono',monospace"
          fontSize="8.5" fill="#6c757d" letterSpacing="0.4">PRISMORA·v1</text>
      </svg>
    </div>
  );
}
