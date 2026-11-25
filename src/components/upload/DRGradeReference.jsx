/**
 * DRGradeReference — Compact five-grade Diabetic Retinopathy severity reference
 * consistent with PRISMORA AI's editorial scientific design language.
 */
const DR_GRADES = [
  {
    code: 'Grade 0',
    name: 'No DR',
    dotClass: 'bg-emerald-600',
    badgeClass: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    description: 'No apparent retinopathy; retinal vasculature and macula appear unremarkable.',
  },
  {
    code: 'Grade 1',
    name: 'Mild DR',
    dotClass: 'bg-teal-600',
    badgeClass: 'text-teal-700 bg-teal-50 border-teal-200',
    description: 'Microaneurysms only; earliest detectable retinal vascular alterations.',
  },
  {
    code: 'Grade 2',
    name: 'Moderate DR',
    dotClass: 'bg-amber-600',
    badgeClass: 'text-amber-800 bg-amber-50 border-amber-200',
    description: 'More than microaneurysms (haemorrhages or exudates), less than Severe DR.',
  },
  {
    code: 'Grade 3',
    name: 'Severe DR',
    dotClass: 'bg-orange-600',
    badgeClass: 'text-orange-800 bg-orange-50 border-orange-200',
    description: 'Extensive intraretinal haemorrhages, venous beading, or prominent IRMA.',
  },
  {
    code: 'Grade 4',
    name: 'Proliferative DR',
    dotClass: 'bg-red-600',
    badgeClass: 'text-red-800 bg-red-50 border-red-200',
    description: 'Neovascularisation or vitreous/preretinal haemorrhage indicating advanced disease.',
  },
];

export default function DRGradeReference() {
  return (
    <section
      aria-labelledby="dr-reference-heading"
      className="rounded-xl border border-neutral-200 bg-white shadow-sm overflow-hidden"
    >
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-neutral-200 bg-neutral-100/70">
        <div>
          <span className="block font-mono text-2xs uppercase tracking-widest text-neutral-500">
            APTOS 2019 · Grading Scale
          </span>
          <h2
            id="dr-reference-heading"
            className="text-sm font-semibold text-navy-600 mt-0.5"
          >
            Diabetic Retinopathy Reference
          </h2>
        </div>
        <span className="font-mono text-2xs text-neutral-500 uppercase tracking-wider">
          5 Classes
        </span>
      </div>

      <div className="divide-y divide-neutral-200">
        {DR_GRADES.map(({ code, name, dotClass, badgeClass, description }) => (
          <div key={code} className="px-5 py-3 flex flex-col gap-1.5">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-2xs font-medium uppercase tracking-wider text-neutral-500">
                  {code}
                </span>
                <span className="text-xs font-semibold text-navy-600">
                  {name}
                </span>
              </div>
              <span
                className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded border font-mono text-2xs font-medium ${badgeClass}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${dotClass}`} aria-hidden="true" />
                {code.replace('Grade ', 'G')}
              </span>
            </div>
            <p className="text-xs leading-relaxed text-neutral-600">
              {description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
