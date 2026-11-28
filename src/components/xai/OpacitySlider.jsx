export default function OpacitySlider({ value, onChange, disabled }) {
  return (
    <label className={`flex items-center gap-3 ${disabled ? 'opacity-50' : ''}`}>
      <span className="font-mono text-2xs uppercase tracking-wider text-neutral-500 whitespace-nowrap">Heatmap opacity</span>
      <input
        type="range"
        min={0}
        max={100}
        step={5}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-28 sm:w-36 h-1.5 cursor-pointer accent-teal-600 disabled:cursor-not-allowed"
      />
      <span className="w-10 font-mono text-xs text-neutral-700">{value}%</span>
    </label>
  );
}
