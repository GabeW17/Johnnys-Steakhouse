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

  const picked = current !== content.locationBar.defaultLabel;

  return (
    <div
      className={`fixed inset-x-0 top-0 z-40 transform border-b border-ink/10 bg-cream/95 shadow-[0_10px_30px_-14px_rgba(0,0,0,0.55)] backdrop-blur-md transition-transform duration-500 ease-out-expo ${
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
            className="flex items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-black"
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
              className="text-ink/55"
            >
              <path d="M12 21s-7-5.686-7-11a7 7 0 1 1 14 0c0 5.314-7 11-7 11Z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
            <span>
              {picked && <span className="text-ink/50">Johnny&rsquo;s </span>}
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
              className={`text-ink/50 transition-transform duration-300 ${
                open ? "rotate-180" : ""
              }`}
            >
              <path d="M4 6l4 4 4-4" />
            </svg>
          </button>

          {open && (
            <ul
              role="listbox"
              className="absolute left-0 top-[calc(100%+10px)] z-50 max-h-72 w-60 overflow-auto rounded-lg border border-ink/10 bg-cream py-1.5 shadow-2xl shadow-black/30"
            >
              <li className="px-4 pb-1.5 pt-1 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-ink/45">
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
                      className={`flex w-full items-center justify-between px-4 py-2 text-left text-sm transition-colors hover:bg-ink/5 ${
                        active ? "font-medium text-ink" : "text-ink/65"
                      }`}
                    >
                      <span>{loc.city}</span>
                      <span className="text-xs text-ink/45">{loc.state}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Go to the selected location (routes to that location's page once
            those exist; for now jumps to the Locations finder). Disabled until
            a location is chosen. */}
        {picked ? (
          <a
            href="#locations"
            className="btn btn-sm inline-flex items-center gap-2 bg-ink text-cream hover:bg-[#201c1a]"
          >
            Go to this location
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        ) : (
          <button
            type="button"
            disabled
            className="btn btn-sm inline-flex cursor-not-allowed items-center gap-2 border border-ink/20 bg-transparent text-ink/35"
          >
            Go to this location
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
