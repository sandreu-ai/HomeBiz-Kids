import { cn } from "@/lib/utils";

interface EyebrowLabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  className?: string;
}

export function EyebrowLabel({ className, children, ...props }: EyebrowLabelProps) {
  return (
    <span
      className={cn(
        "font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-ink-3",
        className
      )}
      style={{ letterSpacing: "0.1em" }}
      {...props}
    >
      {children}
    </span>
  );
}

interface ScriptAccentProps {
  children: React.ReactNode;
  color?: "blue" | "red" | "yellow" | "green";
  className?: string;
}

export function ScriptAccent({ children, color = "red", className }: ScriptAccentProps) {
  const colorClass = {
    blue: "text-blue-deep",
    red: "text-red",
    yellow: "text-yellow-deep",
    green: "text-green-deep",
  }[color];

  return (
    <span className={cn("font-script font-bold", colorClass, className)}>{children}</span>
  );
}
