import { CircleCheck } from "lucide-react";

import { cn } from "@/lib/utils";

export function CheckList({
  items,
  columns = 1,
  className,
}: {
  items: readonly string[];
  columns?: 1 | 2;
  className?: string;
}) {
  return (
    <ul className={cn("grid gap-x-8 gap-y-3", columns === 2 && "sm:grid-cols-2", className)}>
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <CircleCheck aria-hidden="true" className="text-success mt-1 size-5 shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
