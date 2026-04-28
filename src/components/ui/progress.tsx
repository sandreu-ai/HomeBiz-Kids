"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";

interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  variant?: "blue" | "yellow" | "green";
}

const fillByVariant: Record<NonNullable<ProgressProps["variant"]>, string> = {
  blue: "bg-gradient-to-r from-blue-deep to-blue",
  yellow: "bg-gradient-to-r from-yellow-deep to-yellow",
  green: "bg-gradient-to-r from-green-deep to-green",
};

const Progress = React.forwardRef<React.ElementRef<typeof ProgressPrimitive.Root>, ProgressProps>(
  ({ className, value, variant = "blue", ...props }, ref) => (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-bone border border-line",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn("h-full w-full flex-1 rounded-full transition-all duration-500 ease-out", fillByVariant[variant])}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
);
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
