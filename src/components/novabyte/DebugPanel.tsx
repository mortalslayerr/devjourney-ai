import { Play } from "lucide-react";

interface DebugPanelProps {
  onSimulatePRMerged: () => void;
  onSimulateLMS: () => void;
  onSimulateDocuSign: () => void;
}

export const DebugPanel = ({ onSimulatePRMerged, onSimulateLMS, onSimulateDocuSign }: DebugPanelProps) => (
  <div className="pt-6 border-t border-nova-white-5">
    <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-4 flex items-center gap-2">
      <Play size={10} /> Debug Webhooks
    </h3>
    <div className="grid grid-cols-1 gap-2">
      {[
        { label: "POST /webhook/github/pr-merged", action: onSimulatePRMerged },
        { label: "POST /mock/lms-complete", action: onSimulateLMS },
        { label: "POST /mock/docusign-signed", action: onSimulateDocuSign },
      ].map(btn => (
        <button
          key={btn.label}
          onClick={btn.action}
          className="text-left px-3 py-2 rounded bg-nova-surface border border-nova-white-5 text-[10px] font-mono text-muted-foreground hover:bg-secondary transition-colors"
        >
          {btn.label}
        </button>
      ))}
    </div>
  </div>
);
