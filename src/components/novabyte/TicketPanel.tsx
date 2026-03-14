import { Check } from "lucide-react";
import { GlassPanel } from "./GlassPanel";

export type TicketStatus = "Unassigned" | "Picked Up" | "PR Submitted" | "Merged";

const STEPS: TicketStatus[] = ["Unassigned", "Picked Up", "PR Submitted", "Merged"];

interface TicketPanelProps {
  status: TicketStatus;
  assignee: string;
}

export const TicketPanel = ({ status, assignee }: TicketPanelProps) => {
  const currentIdx = STEPS.indexOf(status);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Starter Ticket</h3>
        <span className="text-[10px] font-mono text-primary bg-nova-blue-soft px-1.5 py-0.5 rounded">
          FLOW-INTERN-001
        </span>
      </div>

      <GlassPanel className="p-4 space-y-4">
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-foreground">Fix login API validation</h4>
          <p className="text-xs text-muted-foreground">Assigned to: {assignee}</p>
        </div>

        <div className="space-y-3">
          {STEPS.map((step, i) => {
            const isCompleted = i < currentIdx;
            const isActive = i === currentIdx;

            return (
              <div key={step} className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                  isCompleted ? "bg-nova-success border-nova-success" :
                  isActive ? "bg-primary border-primary glow-blue" :
                  "border-nova-white-10"
                }`}>
                  {isCompleted ? (
                    <Check size={12} className="text-primary-foreground" />
                  ) : isActive ? (
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-foreground" />
                  ) : (
                    <div className="w-1.5 h-1.5 rounded-full bg-nova-white-20" />
                  )}
                </div>
                <span className={`text-xs ${isActive ? "text-foreground font-medium" : isCompleted ? "text-nova-success" : "text-muted-foreground"}`}>
                  {step}
                </span>
              </div>
            );
          })}
        </div>
      </GlassPanel>
    </div>
  );
};
