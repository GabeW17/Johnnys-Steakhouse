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
    const onScroll = () => setShown(window.scrollY > window.innerHeight - 100);
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
  const picked = current !== content.locationBar.defaultLabel;

  return (
    <div
      className={`fixed inset-x-0 top-0 z-40 transform border-b border-cream/10 bg-[#121212]/95 backdrop-blur-md transition-transform duration-500 ease-out-expo ${
        shown ? "translate-y-[68px]" : "-translate-y-full"
      }`}
    >
      <div className="mx-auto flex max-w-shell items-center justify-between gap-3 px-5 py-2.5 sm:px-8">
        {/* Location picker — choose your Johnny's */}
        <div className="relative" ref={pickerRef}>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-haspopup="listbox"
            aria-expanded={open}
            className="flex items-center gap-2 text-sm font-medium text-cream transition-colors hover:text-white"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="text-dim-cream"
            >
              <path d="M12 21s-7-5.686-7-11a7 7 0 1 1 14 0c0 5.314-7 11-7 11Z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
            <span>
              {picked && (
                <span className="text-dim-cream">Johnny&rsquo;s </span>
              )}
              {current}
            </span>
            <svg
              width="11"
              height="11"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className={`text-dim-cream transition-transform duration-300 ${
                open ? "rotate-180" : ""
              }`}
            >
              <path d="M4 6l4 4 4-4" />
            </svg>
          </button>

          {open && (
            <ul
              role="listbox"
              className="absolute left-0 top-[calc(100%+10px)] z-50 max-h-72 w-60 overflow-auto rounded-lg border border-cream/10 bg-[#161616] py-1.5 shadow-2xl shadow-black/60"
            >
              <li className="px-4 pb-1.5 pt-1 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-dim-cream/70">
                Choose your location
              </li>
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
                  isReserve ? "btn-primary" : "btn-ghost hidden sm:inline-flex"
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
