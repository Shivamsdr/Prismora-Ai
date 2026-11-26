/**
 * ModelInformation — Displays available backend model and session metadata
 * without inventing unavailable fields.
 */
export default function ModelInformation({ result }) {
  if (!result) return null;

  const formattedTimestamp = result.createdAt
    ? new Date(result.createdAt).toLocaleString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    : 'Not provided';

  const rows = [
    {
      label: 'Architecture',
      value: result.modelName || 'Not provided',
    },
    {
      label: 'Version',
      value: result.modelVersion || 'Not provided',
    },
    {
      label: 'Modality',
      value: result.modality === 'chest' ? 'Chest X-ray' : 'Retinal Fundus',
    },
    {
      label: 'Timestamp',
      value: formattedTimestamp,
    },
  ];

  if (result.filename) {
    rows.push({ label: 'Source file', value: result.filename });
  }

  if (result.analysisMetadata && typeof result.analysisMetadata === 'object') {
    Object.entries(result.analysisMetadata).forEach(([key, val]) => {
      if (val !== null && val !== undefined && val !== '') {
        rows.push({
          label: key,
          value: typeof val === 'object' ? JSON.stringify(val) : String(val),
        });
      }
    });
  }

  return (
    <section
      aria-labelledby="model-info-heading"
      className="rounded-xl border border-neutral-200 bg-white shadow-sm overflow-hidden"
    >
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-neutral-200 bg-neutral-100/70">
        <h2
          id="model-info-heading"
          className="text-sm font-semibold text-navy-600"
        >
          Model Information
        </h2>
        <span className="font-mono text-2xs uppercase tracking-wider text-neutral-500">
          Metadata
        </span>
      </div>

      <div className="divide-y divide-neutral-200">
        {rows.map(({ label, value }, index) => (
          <div
            key={label}
            className={`flex items-start justify-between gap-4 px-5 py-2.5 ${
              index % 2 === 1 ? 'bg-neutral-50' : 'bg-white'
            }`}
          >
            <span className="font-mono text-2xs uppercase tracking-wider text-neutral-500 shrink-0 pt-0.5">
              {label}
            </span>
            <span className="font-mono text-xs text-neutral-700 text-right break-all">
              {value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
