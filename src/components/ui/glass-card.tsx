import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hover?: boolean;
}

export function GlassCard({
  children,
  hover = true,
  className,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn("glass-card", hover && "glass-card-hover", className)}
      {...props}
    >
      {children}
    </div>
  );
}
