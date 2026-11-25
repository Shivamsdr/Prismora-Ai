/**
 * RetinaVisual — Schematic retinal fundus diagram for the Login page left panel.
 * Pure SVG, no actual medical imagery.
 */
export default function RetinaVisual() {
  return (
    <div className="relative w-full select-none" style={{ maxWidth: '340px' }} aria-hidden="true">
      <svg viewBox="0 0 340 340" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">

        {/* Background */}
        <rect x="0" y="0" width="340" height="340" rx="2" fill="#f0fdfa" opacity="0.4" />

        {/* Fine grid */}
        {[40,80,120,160,200,240,280,320].map(n => (
          <g key={n}>
            <line x1={n} y1="0" x2={n} y2="340" stroke="#ccfbf1" strokeWidth="0.6" />
            <line x1="0" y1={n} x2="340" y2={n} stroke="#ccfbf1" strokeWidth="0.6" />
          </g>
        ))}

        {/* Outer fundus circle */}
        <circle cx="170" cy="170" r="140" fill="none" stroke="#99f6e4" strokeWidth="1" />
        <circle cx="170" cy="170" r="130" fill="none" stroke="#b2f5ea" strokeWidth="0.5" strokeDasharray="4 4" />

        {/* Vasculature — schematic branching lines */}
        {/* Superior arcade */}
        <path d="M170,170 Q200,120 240,90" stroke="#5eead4" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <path d="M200,130 Q220,110 250,105" stroke="#5eead4" strokeWidth="1" strokeLinecap="round" fill="none" />
        <path d="M220,110 Q240,95 255,100" stroke="#5eead4" strokeWidth="0.75" strokeLinecap="round" fill="none" />

        {/* Inferior arcade */}
        <path d="M170,170 Q200,220 238,252" stroke="#5eead4" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <path d="M200,210 Q220,232 248,236" stroke="#5eead4" strokeWidth="1" strokeLinecap="round" fill="none" />

        {/* Nasal vessels */}
        <path d="M170,170 Q130,155 95,145" stroke="#5eead4" strokeWidth="1.25" strokeLinecap="round" fill="none" />
        <path d="M130,155 Q110,148 90,158" stroke="#5eead4" strokeWidth="0.75" strokeLinecap="round" fill="none" />
        <path d="M170,170 Q130,185 92,198" stroke="#5eead4" strokeWidth="1.25" strokeLinecap="round" fill="none" />

        {/* Optic disc */}
        <circle cx="170" cy="170" r="22" fill="none" stroke="#0d9488" strokeWidth="1.25" />
        <circle cx="170" cy="170" r="12" fill="none" stroke="#14b8a6" strokeWidth="1" strokeDasharray="2 2" />
        <circle cx="170" cy="170" r="4" fill="#14b8a6" opacity="0.5" />

        {/* Macula */}
        <circle cx="210" cy="170" r="14" fill="none" stroke="#0d9488" strokeWidth="0.75" strokeDasharray="3 3" opacity="0.6" />
        <circle cx="210" cy="170" r="4" fill="none" stroke="#0d9488" strokeWidth="0.75" opacity="0.5" />

        {/* Annotation — optic disc */}
        <line x1="170" y1="148" x2="170" y2="128" stroke="#0d9488" strokeWidth="0.75" />
        <text x="170" y="122" textAnchor="middle" fontFamily="'JetBrains Mono',monospace"
          fontSize="8" fill="#0d9488" letterSpacing="0.4">OD</text>

        {/* Annotation — macula */}
        <line x1="210" y1="156" x2="220" y2="136" stroke="#0d9488" strokeWidth="0.75" />
        <text x="232" y="130" textAnchor="middle" fontFamily="'JetBrains Mono',monospace"
          fontSize="8" fill="#0d9488" letterSpacing="0.4">MAC</text>

        {/* Grade scale — right side */}
        {[
          ['Grade 0', 'No DR',          '#059669'],
          ['Grade 1', 'Mild',           '#0d9488'],
          ['Grade 2', 'Moderate',       '#d97706'],
          ['Grade 3', 'Severe',         '#ea580c'],
          ['Grade 4', 'Proliferative',  '#dc2626'],
        ].map(([g, label, color], i) => (
          <g key={g}>
            <rect x="262" y={40 + i*52} width="68" height="40" rx="2"
              fill="white" stroke="#e9ecef" strokeWidth="0.75" />
            <text x="296" y={56 + i*52} textAnchor="middle"
              fontFamily="'JetBrains Mono',monospace" fontSize="6.5"
              fill="#adb5bd" letterSpacing="0.5">{g}</text>
            <text x="296" y={70 + i*52} textAnchor="middle"
              fontFamily="'JetBrains Mono',monospace" fontSize="7.5"
              fill={color} letterSpacing="0.3" fontWeight="500">{label}</text>
          </g>
        ))}

        {/* Status bar */}
        <rect x="0" y="310" width="340" height="30" fill="#f0fdfa" opacity="0.7" />
        <line x1="0" y1="310" x2="340" y2="310" stroke="#99f6e4" strokeWidth="0.75" />
        <text x="12" y="329" fontFamily="'JetBrains Mono',monospace"
          fontSize="7.5" fill="#0d9488" letterSpacing="0.5">RETINAL · FUNDUS · APTOS 2019</text>
        <text x="328" y="329" textAnchor="end" fontFamily="'JetBrains Mono',monospace"
          fontSize="7.5" fill="#14b8a6" letterSpacing="0.5">RESEARCH</text>
      </svg>
    </div>
  );
}
