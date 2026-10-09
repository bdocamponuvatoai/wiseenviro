import { ChevronDown } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

const controlBase =
  "block w-full rounded-md border border-input bg-surface px-3.5 py-2.5 text-base text-surface-foreground transition-[border-color,box-shadow] duration-(--duration-fast) placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-danger aria-invalid:ring-danger/20";

export function Input({ className, ...props }: ComponentProps<"input">) {
  return <input className={cn(controlBase, "min-h-11", className)} {...props} />;
}

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return <textarea className={cn(controlBase, "min-h-32 resize-y", className)} {...props} />;
}

export function Select({ className, ...props }: ComponentProps<"select">) {
  return (
    <div className="relative">
      <select className={cn(controlBase, "min-h-11 appearance-none pr-10", className)} {...props} />
      <ChevronDown
        aria-hidden="true"
        className="text-muted-foreground pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2"
      />
    </div>
  );
}

export function Label({ className, ...props }: ComponentProps<"label">) {
  return (
    <label
      className={cn("text-foreground mb-1.5 block text-sm font-semibold", className)}
      {...props}
    />
  );
}

interface FieldProps {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  className?: string;
  children: ReactNode;
}

/** Label, control, hint and error wired together. The control must use `id`, `${id}-hint` and `${id}-error`. */
export function Field({ id, label, required, hint, error, className, children }: FieldProps) {
  return (
    <div className={className}>
      <Label htmlFor={id}>
        {label}
        {required ? (
          <span className="text-danger" aria-hidden="true">
            {" "}
            *
          </span>
        ) : (
          <span className="text-muted-foreground font-normal"> (optional)</span>
        )}
      </Label>
      {children}
      {hint ? (
        <p id={`${id}-hint`} className="text-muted-foreground mt-1.5 text-sm">
          {hint}
        </p>
      ) : null}
      <p id={`${id}-error`} className="text-danger mt-1.5 text-sm font-semibold empty:hidden">
        {error}
      </p>
    </div>
  );
}

/** aria-describedby value for a control rendered inside <Field>. */
export function describedBy(id: string, opts: { hint?: boolean; error?: string }) {
  return (
    [opts.hint ? `${id}-hint` : null, opts.error ? `${id}-error` : null]
      .filter(Boolean)
      .join(" ") || undefined
  );
}
