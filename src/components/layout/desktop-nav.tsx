"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

import { isNavGroup, type NavGroup, type NavLink } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const linkClass =
  "relative inline-flex min-h-11 items-center rounded-full px-3 text-sm font-semibold text-foreground transition-colors duration-(--duration-fast) hover:bg-muted aria-[current=page]:bg-foreground aria-[current=page]:text-background";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Disclosure-pattern dropdown: the label is a real link (works without JS),
 * the chevron button toggles the panel. Esc and outside clicks close it.
 */
function NavDropdown({ group, pathname }: { group: NavGroup; pathname: string }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const rootRef = useRef<HTMLLIElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  const groupActive =
    isActive(pathname, group.href) || group.children.some((c) => isActive(pathname, c.href));

  return (
    <li
      ref={rootRef}
      className="relative flex items-center"
      onPointerEnter={(e) => {
        if (e.pointerType !== "mouse") return;
        window.clearTimeout(closeTimer.current);
        setOpen(true);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType !== "mouse") return;
        closeTimer.current = window.setTimeout(() => setOpen(false), 150);
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) {
          setOpen(false);
          buttonRef.current?.focus();
        }
      }}
      onBlur={(e) => {
        if (!rootRef.current?.contains(e.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <Link
        href={group.href}
        className={linkClass}
        aria-current={isActive(pathname, group.href) ? "page" : undefined}
      >
        {/* Highlight the group when a child page is active (the pill already marks the group page itself). */}
        <span className={cn(groupActive && !isActive(pathname, group.href) && "text-link")}>
          {group.label}
        </span>
      </Link>
      <button
        ref={buttonRef}
        type="button"
        className="text-link inline-flex size-11 cursor-pointer items-center justify-center rounded-sm"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={`${group.label} services menu`}
        onClick={() => setOpen((v) => !v)}
      >
        <ChevronDown
          aria-hidden="true"
          className={cn(
            "size-5 transition-transform duration-(--duration-base) ease-(--ease-standard)",
            open && "rotate-180",
          )}
        />
      </button>
      <div
        id={panelId}
        hidden={!open}
        className="absolute top-full left-1/2 z-50 w-[34rem] -translate-x-1/2 pt-2"
      >
        <div className="bg-primary text-primary-foreground shadow-lift grid grid-cols-[13rem_1fr] gap-6 overflow-hidden rounded-lg p-6">
          <div>
            <p className="font-display text-3xl leading-tight font-medium">{group.label}</p>
            <p className="mt-2 text-sm leading-relaxed">{group.description}</p>
            <Link
              href={group.href}
              className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold underline underline-offset-4"
              onClick={() => setOpen(false)}
            >
              View all {group.label.toLowerCase()} services
            </Link>
          </div>
          <ul className="border-primary-foreground/30 border-l pl-6">
            {group.children.map((child) => (
              <li key={child.href}>
                <Link
                  href={child.href}
                  className="flex min-h-11 items-center rounded-sm font-semibold transition-[padding] duration-(--duration-fast) hover:pl-1 hover:underline hover:underline-offset-4"
                  aria-current={isActive(pathname, child.href) ? "page" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {child.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </li>
  );
}

export function DesktopNav({ items }: { items: (NavGroup | NavLink)[] }) {
  const pathname = usePathname();
  return (
    <nav aria-label="Main" className="hidden lg:block">
      <ul className="flex items-center gap-x-1 xl:gap-x-2">
        {items.map((item) =>
          isNavGroup(item) ? (
            <NavDropdown key={item.href} group={item} pathname={pathname} />
          ) : (
            <li key={item.href}>
              <Link
                href={item.href}
                className={linkClass}
                aria-current={isActive(pathname, item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            </li>
          ),
        )}
      </ul>
    </nav>
  );
}
