import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex min-h-12 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full font-bold tracking-[0.14em] uppercase whitespace-nowrap transition-[background-color,color,border-color,box-shadow,transform] duration-(--duration-fast) ease-(--ease-standard) select-none active:translate-y-px disabled:pointer-events-none disabled:opacity-60 [&_svg]:size-[1.15em] [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground shadow-card hover:bg-primary-hover hover:shadow-lift",
        outline:
          "border-2 border-current bg-transparent text-link hover:border-foreground hover:bg-foreground hover:text-background",
        /** On light bands (error and 404 pages). */
        "outline-inverse":
          "border-2 border-band-foreground bg-transparent text-band-foreground hover:bg-band-foreground hover:text-band",
        /** On photography under a scrim (image heroes). */
        "outline-media":
          "border-2 border-on-media bg-transparent text-on-media hover:bg-on-media hover:text-foreground",
      },
      size: {
        md: "px-5 py-2.5 text-base",
        lg: "min-h-14 px-8 py-3.5 text-xs",
        icon: "size-11",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

interface ButtonProps extends ComponentProps<"button">, VariantProps<typeof buttonVariants> {
  /** Render the child element (e.g. a Link) with button styles. */
  asChild?: boolean;
}

export function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button";
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
