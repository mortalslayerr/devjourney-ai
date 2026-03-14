import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  role: "assistant" | "user";
  content: string;
  options?: string[];
  onOptionClick?: (option: string) => void;
}

export const ChatMessage = ({ role, content, options, onOptionClick }: ChatMessageProps) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
    className={cn("flex", role === "user" ? "justify-end" : "justify-start")}
  >
    <div className="max-w-[80%] space-y-3">
      <div className={cn(
        "p-4 rounded-2xl text-sm leading-relaxed",
        role === "user"
          ? "bg-primary text-primary-foreground rounded-tr-sm"
          : "glass-panel rounded-tl-sm"
      )}>
        {content}
      </div>
      {options && onOptionClick && (
        <div className="flex flex-wrap gap-2">
          {options.map(opt => (
            <button
              key={opt}
              onClick={() => onOptionClick(opt)}
              className="px-4 py-2 rounded-full border border-nova-blue-border bg-nova-blue-soft hover:bg-nova-blue-hover hover:border-primary/50 text-primary text-xs font-medium transition-all duration-150"
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  </motion.div>
);
