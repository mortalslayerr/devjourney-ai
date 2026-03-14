import { CheckCircle2, Circle } from "lucide-react";
import { motion } from "framer-motion";

interface TaskItemProps {
  task: string;
  completed: boolean;
  onClick: () => void;
}

export const TaskItem = ({ task, completed, onClick }: TaskItemProps) => (
  <div
    onClick={onClick}
    className="group flex items-center gap-3 p-3 rounded-xl glass-panel-subtle hover:border-nova-white-20 cursor-pointer transition-all duration-150"
  >
    {completed ? (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.25, ease: [0.2, 0, 0, 1] }}
      >
        <CheckCircle2 size={16} className="text-primary" />
      </motion.div>
    ) : (
      <Circle size={16} className="text-muted-foreground/40 group-hover:text-muted-foreground transition-colors" />
    )}
    <span className={`text-xs ${completed ? "text-muted-foreground line-through" : "text-foreground"}`}>
      {task}
    </span>
  </div>
);
