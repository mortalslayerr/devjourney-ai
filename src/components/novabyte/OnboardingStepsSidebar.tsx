import { User, Settings, Ticket, CheckCircle2, Terminal } from "lucide-react";
import { motion } from "framer-motion";

export type Stage = "Persona" | "Setup" | "Ticket" | "Completion";

const STAGES: { id: Stage; icon: typeof User; label: string }[] = [
  { id: "Persona", icon: User, label: "Persona" },
  { id: "Setup", icon: Settings, label: "Setup" },
  { id: "Ticket", icon: Ticket, label: "Starter Ticket" },
  { id: "Completion", icon: CheckCircle2, label: "Completion" },
];

const STAGE_ORDER: Stage[] = ["Persona", "Setup", "Ticket", "Completion"];

interface Props {
  currentStage: Stage;
}

export const OnboardingStepsSidebar = ({ currentStage }: Props) => {
  const currentIdx = STAGE_ORDER.indexOf(currentStage);

  return (
    <aside className="w-64 border-r border-nova-white-5 flex flex-col p-6 bg-sidebar">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center glow-blue">
          <Terminal size={18} className="text-primary-foreground" />
        </div>
        <span className="font-bold tracking-tight text-lg text-foreground">NovaByte</span>
      </div>

      <nav className="space-y-1">
        {STAGES.map((s, i) => {
          const isCompleted = i < currentIdx;
          const isActive = currentStage === s.id;

          return (
            <div
              key={s.id}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all relative ${
                isActive ? "bg-nova-blue-soft text-primary" : "text-muted-foreground"
              }`}
            >
              {isCompleted ? (
                <CheckCircle2 size={18} className="text-nova-success" />
              ) : (
                <s.icon size={18} />
              )}
              <span className="text-sm font-medium">{s.label}</span>
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="ml-auto w-1 h-4 bg-primary rounded-full"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </div>
          );
        })}
      </nav>

      <div className="mt-auto p-4 rounded-xl bg-nova-white-5 border border-nova-white-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-2 h-2 rounded-full bg-nova-success animate-pulse-glow" />
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">System Status</span>
        </div>
        <p className="text-[11px] text-muted-foreground/60 leading-relaxed">
          Agent v2.4.0 active. RAG pipeline connected to internal docs.
        </p>
      </div>
    </aside>
  );
};
