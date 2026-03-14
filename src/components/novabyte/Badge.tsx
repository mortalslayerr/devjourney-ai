import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "blue" | "success";
  className?: string;
}

export const NovaBadge = ({ children, variant = "blue", className }: BadgeProps) => (
  <span className={cn(
    "px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider",
    variant === "blue" && "bg-nova-blue-soft border border-nova-blue-border text-primary",
    variant === "success" && "bg-nova-success-soft border border-nova-success/20 text-nova-success",
    className
  )}>
    {children}
  </span>
);
