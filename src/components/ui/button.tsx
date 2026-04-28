"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-bold tracking-tight transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-deep focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-blue-deep text-paper shadow-cta hover:bg-blue active:translate-y-px",
        primary: "bg-blue-deep text-paper shadow-cta hover:bg-blue active:translate-y-px",
        yellow: "bg-yellow text-yellow-ink-deep shadow-cta-yellow hover:bg-yellow-deep active:translate-y-px",
        gold: "bg-yellow text-yellow-ink-deep shadow-cta-yellow hover:bg-yellow-deep active:translate-y-px",
        secondary: "bg-paper text-ink border border-ink-5 hover:bg-bone active:translate-y-px",
        outline: "bg-paper text-ink border border-ink-5 hover:bg-bone active:translate-y-px",
        ghost: "bg-transparent text-ink-2 hover:bg-bone active:translate-y-px",
        danger: "bg-paper text-red-deep border border-red-soft hover:bg-red-tint active:translate-y-px",
        destructive: "bg-red-deep text-paper hover:bg-red active:translate-y-px",
        green: "bg-green-deep text-paper hover:bg-green active:translate-y-px",
        link: "text-blue-deep underline-offset-4 hover:underline p-0 h-auto font-medium",
        "soft-green": "bg-green-tint text-green-deep hover:bg-green-soft active:translate-y-px",
      },
      size: {
        default: "h-11 px-5 py-2.5",
        sm: "h-9 px-3.5 text-xs",
        lg: "h-12 px-7 text-base",
        xl: "h-14 px-9 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
