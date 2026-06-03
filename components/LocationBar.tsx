"use client";

import { useEffect, useRef, useState } from "react";
import { content } from "@/content";

export default function LocationBar() {
  const [shown, setShown] = useState(false);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(content.locationBar.defaultLabel);
  const pickerRef = useRef<HTMLDivElement>(null);

  // Slide down once the hero is scrolled past.
  useEffect(() => {
    const onScroll = () =>
      setShown(window.scrollY > window.innerHeight - 100);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the dropdown on outside click.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const actions = content.locationBar.actions;

  return (
    <div
      className={`fixed inset-x-0 top-0 z-40 transform border-b border-cream/15 bg-espresso/90 backdrop-blur-md transition-transform duration-500 ease-out-expo ${
        shown ? "translate-y-[68px]" : "-translate-y-full"
      }`}
    >
      <div className="mx-auto flex max-w-shell items-center justify-between gap-3 px-5 py-2.5 sm:px-8">
        {/* Location picker (visual only — does not re-scope the page) */}
        <div className="relative" ref={pickerRef}>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-haspopup="listbox"
            aria-expanded={open}
            className="flex items-center gap-1.5 text-sm font-medium text-cream"
          >
            <span aria-hidden="true">📍</span>
            <span>{current}</span>
            <span
              aria-hidden="true"
              className={`text-dim-cream transition-transform ${
                open ? "rotate-180" : ""
              }`}
            >
              ▾
            </span>
          </button>

          {open && (
            <ul
              role="listbox"
              className="absolute left-0 top-[calc(100%+10px)] z-50 max-h-72 w-56 overflow-auto rounded-lg border border-cream/15 bg-panel py-1.5 shadow-2xl shadow-black/60"
            >
              {content.locations.items.map((loc) => {
                const active = loc.city === current;
                return (
                  <li key={`${loc.city}-${loc.state}`}>
                    <button
                      type="button"
                      onClick={() => {
                        setCurrent(loc.city);
                        setOpen(false);
                      }}
                      className={`flex w-full items-center justify-between px-4 py-2 text-left text-sm transition-colors hover:bg-cream/5 ${
                        active ? "text-cream" : "text-dim-cream"
                      }`}
                    >
                      <span>{loc.city}</span>
                      <span className="text-xs text-dim-cream">{loc.state}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* High-intent conversion shortcuts */}
        <div className="flex items-center gap-2 sm:gap-3">
          {actions.map((action, i) => {
            const isReserve = i === actions.length - 1;
            return (
              <a
                key={action.href}
                href={action.href}
                className={`btn btn-sm ${
                  isReserve
                    ? "btn-primary"
                    : "btn-ghost hidden sm:inline-flex"
                }`}
              >
                {action.label}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
