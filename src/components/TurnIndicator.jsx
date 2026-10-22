import { BadgeCheck, BoneFracture } from "lucide-react";

export default function TurnIndicator({ score, bestScore }) {
  if (bestScore === 0)
    return (
      <div className="h-8 flex items-center justify-center mb-space-sm"></div>
    );

  return score > 0 ? (
    <div className="h-8 flex items-center justify-center mb-space-sm">
      <div
        className="transition-all duration-300 inline-flex items-center gap-space-xs px-space-md py-1 rounded-full text-label-md font-label-lg shadow-lg opacity-100 bg-surface-container-highest text-secondary"
        id="status-pill"
      >
        <BadgeCheck size={16} />
        <span>Recall Imprinted: +1</span>
      </div>
    </div>
  ) : (
    <div className="h-8 flex items-center justify-center mb-space-sm">
      <div className="transition-all duration-300 inline-flex items-center gap-space-xs px-space-md py-1 rounded-full text-label-md font-label-lg shadow-lg opacity-100 bg-error-container text-on-error-container">
        <BoneFracture size={16} />
        <span>Repeated Card Score reset.</span>
      </div>
    </div>
  );
}
