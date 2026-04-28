import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-tight transition-colors",
  {
    variants: {
      variant: {
        default: "bg-blue-tint text-blue-deep",
        proposed: "bg-blue-tint text-blue-deep",
        countered: "bg-yellow-tint text-yellow-ink",
        accepted: "bg-green-tint text-green-deep",
        declined: "bg-red-tint text-red-deep",
        paid: "bg-[#EAE3F2] text-[#5F3D9D]",
        secondary: "bg-line-soft text-ink-3",
        destructive: "bg-red-tint text-red-deep",
        outline: "border border-line text-ink-3 bg-transparent",
        gold: "bg-yellow-tint text-yellow-ink",
        blue: "bg-blue-tint text-blue-deep",
        green: "bg-green-tint text-green-deep",
        warm: "bg-line-soft text-ink-2",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {
  dot?: boolean;
}

function Badge({ className, variant, dot = true, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-current" />}
      {children}
    </div>
  );
}

export { Badge, badgeVariants };
