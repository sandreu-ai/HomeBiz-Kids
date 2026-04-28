import { cn } from "@/lib/utils";

interface CoinProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeClasses = {
  sm: "w-3 h-3",
  md: "w-3.5 h-3.5",
  lg: "w-5 h-5",
  xl: "w-7 h-7",
};

export function Coin({ size = "md", className }: CoinProps) {
  return (
    <span
      className={cn(
        "inline-block rounded-full shrink-0",
        sizeClasses[size],
        className
      )}
      style={{
        background: "radial-gradient(circle at 30% 30%, #FDDC73, #FBBC04 60%, #F29900)",
        boxShadow: "0 1px 0 rgba(255,255,255,.4) inset",
      }}
      aria-hidden="true"
    />
  );
}

interface TokenAmountProps {
  amount: number;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function TokenAmount({ amount, size = "md", className }: TokenAmountProps) {
  const textSize = {
    sm: "text-sm font-bold",
    md: "text-base font-bold",
    lg: "text-2xl font-extrabold tracking-tight",
    xl: "text-4xl font-extrabold tracking-tight",
  }[size];
  return (
    <span className={cn("inline-flex items-center gap-1.5", textSize, className)}>
      <Coin size={size} />
      {amount}
    </span>
  );
}
