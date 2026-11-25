import { formatFileSize } from '@hooks/useImageUpload';

/**
 * FileDetails — Displays selected image metadata in the established
 * monospace key-value table style.
 */
export default function FileDetails({ file, dimensions }) {
  if (!file) return null;

  const extension = file.name.includes('.')
    ? file.name.split('.').pop().toUpperCase()
    : 'IMAGE';

  const rows = [
    { label: 'Filename', value: file.name },
    { label: 'Size', value: formatFileSize(file.size) },
    { label: 'Format', value: `${extension} (${file.type || 'image'})` },
  ];

  if (dimensions?.width && dimensions?.height) {
    rows.push({
      label: 'Dimensions',
      value: `${dimensions.width} × ${dimensions.height} px`,
    });
  }

  return (
    <div className="rounded-md border border-neutral-200 overflow-hidden bg-white">
      {rows.map(({ label, value }, index) => (
        <div
          key={label}
          className={`flex items-start gap-3 px-3.5 py-2 ${
            index < rows.length - 1 ? 'border-b border-neutral-200' : ''
          } ${index % 2 === 1 ? 'bg-neutral-100/70' : 'bg-white'}`}
        >
          <span className="font-mono text-2xs uppercase tracking-wider text-neutral-500 w-24 shrink-0 pt-0.5">
            {label}
          </span>
          <span
            className="font-mono text-xs text-neutral-700 break-all leading-relaxed"
            title={value}
          >
            {value}
          </span>
        </div>
      ))}
    </div>
  );
}
