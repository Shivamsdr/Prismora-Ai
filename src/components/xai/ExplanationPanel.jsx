import PanelCard from './PanelCard';
import { MODALITIES } from './xaiConfig';

export default function ExplanationPanel({ modality }) {
  const cfg = MODALITIES[modality];
  return (
    <PanelCard title="Model Attention" tag="Interpretation">
      <div className="px-5 py-4 flex flex-col gap-3">
        <p className="text-xs leading-relaxed text-neutral-700">
          Grad-CAM highlights image regions that contributed most to the model&apos;s output. Higher-intensity areas
          indicate stronger contribution; the colour scale is set by the backend rendering.
        </p>
        <p className="text-xs leading-relaxed text-neutral-700">
          This viewer does not infer or label attention regions. Compare highlighted areas against the {cfg.noun}&apos;s
          anatomical landmarks:
        </p>
        <ul className="flex flex-col gap-1.5">
          {cfg.landmarks.map((l) => (
            <li key={l} className="flex items-start gap-2 text-xs text-neutral-700">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-teal-600 shrink-0" aria-hidden="true" />
              {l}
            </li>
          ))}
        </ul>
        <p className="pt-3 border-t border-neutral-200 text-xs leading-relaxed text-neutral-600">
          Grad-CAM is an explanatory visualization for interpretability only; it is not proof that a prediction is
          medically correct.
        </p>
      </div>
    </PanelCard>
  );
}
