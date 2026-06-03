"use client";

import { useEffect, useState } from "react";
import { content } from "@/content";

export default function LocationBar() {
  const [shown, setShown] = useState(false);

  // Slide down once the hero is scrolled past.
  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight - 100);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const actions = content.locationBar.actions;

  return (
    <div
      className={`fixed inset-x-0 top-0 z-40 transform border-b border-cream/10 bg-[#121212]/95 backdrop-blur-md transition-transform duration-500 ease-out-expo ${
        shown ? "translate-y-[68px]" : "-translate-y-full"
      }`}
    >
      <div className="mx-auto flex max-w-shell items-center justify-between gap-3 px-5 py-2.5 sm:px-8">
        {/* Find-your-location — jumps to the Locations finder (the real chooser) */}
        <a
          href="#locations"
          className="group flex items-center gap-2 text-sm font-medium text-cream transition-colors hover:text-white"
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
          <span>{content.locationBar.defaultLabel}</span>
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="text-dim-cream transition-transform duration-300 group-hover:translate-x-0.5"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>

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
