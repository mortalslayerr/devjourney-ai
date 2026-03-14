import { TaskItem } from "./TaskItem";

interface ChecklistItem {
  id: number;
  task: string;
  completed: boolean;
}

interface ChecklistPanelProps {
  items: ChecklistItem[];
  onToggle: (id: number) => void;
}

export const ChecklistPanel = ({ items, onToggle }: ChecklistPanelProps) => {
  const completed = items.filter(t => t.completed).length;
  const total = items.length;
  const pct = Math.round((completed / total) * 100);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Setup Progress</h3>
        <span className="text-[10px] font-mono text-primary bg-nova-blue-soft px-1.5 py-0.5 rounded tabular-nums">
          {completed}/{total}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-nova-white-5 rounded-full mb-4 overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
          style={{ width: `${pct}%`, boxShadow: pct > 0 ? "0 0 10px hsl(217 91% 60% / 0.5)" : "none" }}
        />
      </div>

      <div className="space-y-2">
        {items.map(item => (
          <TaskItem
            key={item.id}
            task={item.task}
            completed={item.completed}
            onClick={() => onToggle(item.id)}
          />
        ))}
      </div>
    </div>
  );
};
