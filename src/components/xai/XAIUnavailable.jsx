import { EyeOff } from 'lucide-react';

export default function XAIUnavailable({ modalityLabel }) {
  return (
    <div role="status" className="rounded-xl border border-dashed border-neutral-300 bg-neutral-50 px-6 py-14 flex flex-col items-center justify-center text-center gap-2.5">
      <div className="flex items-center justify-center w-10 h-10 rounded-md border border-neutral-200 bg-white text-neutral-400">
        <EyeOff size={18} aria-hidden="true" />
      </div>
      <p className="text-sm font-medium text-neutral-800">Explainability data not available – backend integration pending</p>
      <p className="text-xs text-neutral-500 max-w-md leading-relaxed">
        No Grad-CAM output has been received for this {modalityLabel.toLowerCase()} analysis. Saliency maps are shown
        only when returned directly by the backend model; nothing is generated or simulated here.
      </p>
    </div>
  );
}
