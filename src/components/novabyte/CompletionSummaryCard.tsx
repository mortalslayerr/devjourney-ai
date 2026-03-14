import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { GlassPanel } from "./GlassPanel";

interface Props {
  name: string;
  role: string;
  level: string;
  stack: string;
  ticketId: string;
  timestamp: string;
}

export const CompletionSummaryCard = ({ name, role, level, stack, ticketId, timestamp }: Props) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
  >
    <GlassPanel className="p-6 text-center space-y-4 border-nova-success/20">
      <div className="w-16 h-16 bg-nova-success-soft rounded-full flex items-center justify-center mx-auto mb-4 glow-success">
        <CheckCircle2 size={32} className="text-nova-success" />
      </div>
      <h3 className="text-lg font-bold text-foreground">Onboarding Complete</h3>
      <p className="text-xs text-muted-foreground">All stages have been successfully completed.</p>

      <div className="text-left space-y-3 pt-4 border-t border-nova-white-10">
        {[
          { label: "Developer", value: name },
          { label: "Role", value: `${level} ${role}` },
          { label: "Stack", value: stack },
          { label: "Ticket", value: ticketId },
          { label: "Completed", value: timestamp },
        ].map(item => (
          <div key={item.label} className="flex justify-between items-center">
            <span className="text-[10px] uppercase text-muted-foreground font-bold">{item.label}</span>
            <span className="text-xs font-mono text-foreground">{item.value}</span>
          </div>
        ))}
      </div>

      <button className="w-full py-3 bg-nova-success hover:bg-nova-success/90 rounded-xl text-xs font-bold text-primary-foreground transition-all shadow-lg">
        Go to Dashboard →
      </button>
    </GlassPanel>
  </motion.div>
);
