import PanelCard from './PanelCard';

export default function ImageInfoPanel({ modalityLabel, filename, dimensions, layers }) {
  const status = (v) => (v ? 'Provided' : 'Not provided');
  const rows = [
    { label: 'Modality', value: modalityLabel },
    { label: 'Filename', value: filename || 'Not provided' },
    { label: 'Dimensions', value: dimensions ? `${dimensions.width} × ${dimensions.height} px` : 'Not available' },
    { label: 'Original', value: status(layers.original) },
    { label: 'Grad-CAM', value: status(layers.gradCam) },
    { label: 'Overlay', value: status(layers.overlay) },
  ];
  return (
    <PanelCard title="Image Information" tag="Metadata">
      <div className="divide-y divide-neutral-200">
        {rows.map(({ label, value }, i) => (
          <div key={label} className={`flex items-start gap-3 px-5 py-2.5 ${i % 2 === 1 ? 'bg-neutral-50' : 'bg-white'}`}>
            <span className="font-mono text-2xs uppercase tracking-wider text-neutral-500 w-24 shrink-0 pt-0.5">{label}</span>
            <span className="font-mono text-xs text-neutral-700 break-all" title={value}>{value}</span>
          </div>
        ))}
      </div>
    </PanelCard>
  );
}
