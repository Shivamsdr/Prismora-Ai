/**
 * RetinaThumb — compact retinal fundus schematic for dashboard modality panels.
 */
export default function RetinaThumb() {
  return (
    <div
      className="relative w-full select-none"
      style={{ aspectRatio: '16/9', maxWidth: '100%' }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Panel */}
        <rect x="2" y="2" width="316" height="176" rx="2" fill="#f0fdfa" opacity="0.5" stroke="#99f6e4" strokeWidth="0.75" />

        {/* Grid */}
        {[48,96,144,192,240,288].map(x => (
          <line key={`v${x}`} x1={x} y1="2" x2={x} y2="178" stroke="#ccfbf1" strokeWidth="0.5" />
        ))}
        {[36,72,108,144].map(y => (
          <line key={`h${y}`} x1="2" y1={y} x2="318" y2={y} stroke="#ccfbf1" strokeWidth="0.5" />
        ))}

        {/* Outer fundus circle */}
        <circle cx="145" cy="90" r="72" fill="none" stroke="#99f6e4" strokeWidth="0.75" />
        <circle cx="145" cy="90" r="66" fill="none" stroke="#b2f5ea" strokeWidth="0.4" strokeDasharray="3 3" />

        {/* Vasculature */}
        <path d="M145,90 Q165,62 192,46" stroke="#5eead4" strokeWidth="1.1" strokeLinecap="round" fill="none" />
        <path d="M165,72 Q178,60 196,58" stroke="#5eead4" strokeWidth="0.7" strokeLinecap="round" fill="none" />
        <path d="M145,90 Q165,118 190,135" stroke="#5eead4" strokeWidth="1.1" strokeLinecap="round" fill="none" />
        <path d="M165,108 Q180,120 194,122" stroke="#5eead4" strokeWidth="0.7" strokeLinecap="round" fill="none" />
        <path d="M145,90 Q118,80 92,74" stroke="#5eead4" strokeWidth="0.9" strokeLinecap="round" fill="none" />
        <path d="M145,90 Q118,100 90,108" stroke="#5eead4" strokeWidth="0.9" strokeLinecap="round" fill="none" />

        {/* Optic disc */}
        <circle cx="145" cy="90" r="13" fill="none" stroke="#0d9488" strokeWidth="0.9" />
        <circle cx="145" cy="90" r="6" fill="none" stroke="#14b8a6" strokeWidth="0.75" strokeDasharray="2 1.5" />
        <circle cx="145" cy="90" r="2.5" fill="#14b8a6" opacity="0.5" />

        {/* Macula */}
        <circle cx="174" cy="90" r="8" fill="none" stroke="#0d9488" strokeWidth="0.6" strokeDasharray="2 2" opacity="0.6" />
        <circle cx="174" cy="90" r="2" fill="none" stroke="#0d9488" strokeWidth="0.6" opacity="0.5" />

        {/* OD label */}
        <line x1="145" y1="77" x2="145" y2="64" stroke="#0d9488" strokeWidth="0.6" />
        <text x="145" y="60" textAnchor="middle" fontFamily="'JetBrains Mono',monospace" fontSize="6" fill="#0d9488" letterSpacing="0.4">OD</text>

        {/* Grade legend — right side */}
        {[
          ['G0','No DR','#059669'],
          ['G1','Mild','#0d9488'],
          ['G2','Mod.','#d97706'],
          ['G3','Sev.','#ea580c'],
          ['G4','PDR','#dc2626'],
        ].map(([g,label,color],i) => (
          <g key={g}>
            <rect x="236" y={18 + i*30} width="72" height="24" rx="1.5"
              fill="white" stroke="#e9ecef" strokeWidth="0.5" />
            <text x="250" y={30 + i*30} fontFamily="'JetBrains Mono',monospace"
              fontSize="5.5" fill="#adb5bd" letterSpacing="0.4">{g}</text>
            <text x="272" y={30 + i*30} fontFamily="'JetBrains Mono',monospace"
              fontSize="6.5" fill={color} letterSpacing="0.3" fontWeight="500">{label}</text>
          </g>
        ))}

        {/* Status bar */}
        <rect x="2" y="158" width="316" height="20" fill="#f0fdfa" opacity="0.7" />
        <line x1="2" y1="158" x2="318" y2="158" stroke="#99f6e4" strokeWidth="0.5" />
        <text x="12" y="172" fontFamily="'JetBrains Mono',monospace" fontSize="6" fill="#0d9488" letterSpacing="0.5">
          RETINAL · FUNDUS · APTOS 2019
        </text>
        <text x="308" y="172" textAnchor="end" fontFamily="'JetBrains Mono',monospace" fontSize="6" fill="#0d9488" letterSpacing="0.5">
          AWAITING INPUT
        </text>
      </svg>
    </div>
  );
}
