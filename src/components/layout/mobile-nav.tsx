"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dialog } from "radix-ui";
import { useState, type ReactNode } from "react";

import { isNavGroup, type NavGroup, type NavLink } from "@/lib/site-config";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  items: (NavGroup | NavLink)[];
  /** Server-rendered call button, shown at the bottom of the sheet. */
  callToAction: ReactNode;
}

const itemClass =
  "flex min-h-14 items-center rounded-xl px-3 font-display text-3xl font-semibold text-foreground hover:bg-muted aria-[current=page]:text-link";

/** Accessible slide-in sheet: Radix Dialog provides the focus trap, Esc to close and scroll lock. */
export function MobileNav({ items, callToAction }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const current = (href: string) => (pathname === href ? "page" : undefined);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        className="text-foreground hover:bg-muted inline-flex size-11 cursor-pointer items-center justify-center rounded-full lg:hidden"
        aria-label="Open menu"
      >
        <Menu aria-hidden="true" className="size-7" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-foreground/45 fixed inset-0 z-50 backdrop-blur-sm" />
        <Dialog.Content
          className={cn(
            "bg-background shadow-lift fixed inset-0 z-50 flex flex-col",
            "data-[state=open]:animate-[sheet-in_var(--duration-slow)_var(--ease-standard)]",
          )}
        >
          <div className="border-border flex h-20 items-center justify-between border-b px-5">
            <Dialog.Title className="eyebrow-line text-link">Menu</Dialog.Title>
            <Dialog.Close
              className="hover:bg-muted inline-flex size-11 cursor-pointer items-center justify-center rounded-md"
              aria-label="Close menu"
            >
              <X aria-hidden="true" className="size-6" />
            </Dialog.Close>
          </div>
          <Dialog.Description className="sr-only">Site navigation</Dialog.Description>
          <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 py-8">
            <ul className="space-y-1">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={itemClass}
                    aria-current={current(item.href)}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {isNavGroup(item) ? (
                    <ul className="border-highlight mb-2 ml-3 border-l-2 pl-3">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="text-muted-foreground hover:bg-muted hover:text-foreground aria-[current=page]:text-link flex min-h-11 items-center rounded-md px-3 aria-[current=page]:font-semibold"
                            aria-current={current(child.href)}
                            onClick={() => setOpen(false)}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ul>
          </nav>
          <div className="border-border border-t p-4">{callToAction}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
