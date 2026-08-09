"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export interface NavItem {
  href: string;
  label: string;
}

interface MobileNavProps {
  items: NavItem[];
  email: string;
  linkedin: string;
}

/**
 * Menu for viewports below the breakpoint where the inline nav is hidden.
 *
 * The panel is a full-height sheet under the sticky header, so the close
 * button stays visible and in the same place the open button was.
 */
export function MobileNav({ items, email, linkedin }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  function close() {
    setOpen(false);
    buttonRef.current?.focus();
  }

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        return;
      }
      if (event.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;
      const focusable = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    // If the viewport grows past the breakpoint that hides the trigger, the
    // panel must not be left open with no way to dismiss it.
    const desktop = window.matchMedia("(min-width: 768px)");
    const onBreakpointChange = () => {
      if (desktop.matches) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onBreakpointChange);

    // Stop the page scrolling behind the sheet.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    panelRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onBreakpointChange);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        className="grid h-9 w-9 place-items-center rounded-full border border-[var(--line)] text-[var(--ink)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] md:hidden"
      >
        <span aria-hidden="true" className="relative block h-3.5 w-4">
          <span
            className={
              "absolute left-0 block h-px w-4 bg-current transition-all duration-300 " +
              (open ? "top-1/2 rotate-45" : "top-0.5")
            }
          />
          <span
            className={
              "absolute left-0 block h-px w-4 bg-current transition-all duration-300 " +
              (open ? "top-1/2 -rotate-45" : "top-2.5")
            }
          />
        </span>
      </button>

      {/*
        Portalled to <body> on purpose. The header carries backdrop-blur, and
        backdrop-filter makes an element a containing block for fixed-position
        descendants — inside the header this panel would position against the
        64px header box rather than the viewport, and page content would sit
        over it swallowing clicks. Escaping to <body> restores viewport-fixed
        positioning; the header's z-50 keeps the close button above the panel.
      */}
      {open
        ? createPortal(
            <div
              id="mobile-menu"
              ref={panelRef}
              tabIndex={-1}
              className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto border-t border-[var(--line)] bg-[var(--canvas)] md:hidden"
            >
              <nav aria-label="Primary" className="container-page py-8">
                <p className="label-mono">Sections</p>
                <ul className="mt-5 space-y-1">
                  {items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={close}
                        className="block border-b border-[var(--line)] py-4 font-[family-name:var(--font-grotesk)] text-2xl font-semibold tracking-tight text-[var(--ink)] transition-colors hover:text-[var(--accent)]"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>

                <p className="label-mono mt-10">Contact</p>
                <div className="mt-5 flex flex-col gap-3">
                  <a
                    href={`mailto:${email}`}
                    onClick={close}
                    className="rounded-full bg-[var(--accent)] px-5 py-3 text-center text-sm font-medium text-[var(--on-accent)]"
                  >
                    Get in touch
                  </a>
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noreferrer noopener"
                    onClick={close}
                    className="rounded-full border border-[var(--line-strong)] px-5 py-3 text-center text-sm font-medium text-[var(--ink)]"
                  >
                    LinkedIn ↗
                  </a>
                </div>
              </nav>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
