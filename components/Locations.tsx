"use client";

import { useState } from "react";
import { content, type LocationItem } from "@/content";
import Reveal from "./Reveal";
import LocationsMap from "./LocationsMap";

const STATE_NAMES: Record<string, string> = {
  IA: "Iowa",
  WI: "Wisconsin",
  IL: "Illinois",
  KS: "Kansas",
  TX: "Texas",
  NE: "Nebraska",
  MO: "Missouri",
  MN: "Minnesota",
};

function PinGlyph({ className = "" }: { className?: string }) {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 21s-7-5.686-7-11a7 7 0 1 1 14 0c0 5.314-7 11-7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export default function Locations() {
  const l = content.locations;
  const [selected, setSelected] = useState<LocationItem | null>(null);

  const directions = selected
    ? `https://www.google.com/maps/search/?api=1&query=${selected.lat},${selected.lng}`
    : "#";

  return (
    <section
      id="locations"
      className="border-t border-cream/10 bg-ink py-24 sm:py-32"
    >
      <div className="mx-auto max-w-shell px-6 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-cream/25" />
            <p className="eyebrow">{l.eyebrow}</p>
            <span className="h-px w-8 bg-cream/25" />
          </div>
          <h2 className="mt-5 font-display text-4xl font-semibold text-cream sm:text-5xl">
            {l.heading}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-dim-cream">{l.subtext}</p>
        </Reveal>

        {/* Store locator — map (the star) + synced list/detail panel */}
        <div className="mt-12 grid gap-5 lg:grid-cols-[1.55fr_1fr]">
          {/* Map */}
          <div className="relative">
            <div
              className="pointer-events-none absolute -inset-4 rounded-[2rem]"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(255,210,156,0.10) 0%, transparent 72%)",
              }}
            />
            <div className="relative isolate h-[420px] overflow-hidden rounded-3xl border-2 border-cream/35 shadow-[0_45px_90px_-35px_rgba(0,0,0,0.92)] lg:h-[560px]">
              <LocationsMap onSelect={setSelected} focus={selected} />
            </div>
          </div>

          {/* Panel: list of all locations, or the selected one's detail */}
          <div className="flex h-[460px] flex-col overflow-hidden rounded-2xl border border-cream/12 bg-[#141414] lg:h-[560px]">
            {selected ? (
              <>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="flex items-center gap-2 border-b border-cream/10 px-5 py-3.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-dim-cream transition-colors hover:text-cream"
                >
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
                    <path d="M19 12H5M11 6l-6 6 6 6" />
                  </svg>
                  All locations
                </button>

                <div className="flex-1 overflow-y-auto">
                  <div className="relative h-44 w-full overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={selected.image}
                      alt={`${content.brand}, ${selected.city}`}
                      className="h-full w-full object-cover"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-black/20" />
                  </div>

                  <div className="p-5">
                    <p className="eyebrow">{content.brand}</p>
                    <h3 className="mt-1.5 font-display text-2xl font-semibold text-cream">
                      {selected.city}, {selected.state}
                    </h3>

                    <div className="mt-4 space-y-3 text-sm">
                      <div className="flex items-start gap-3">
                        <svg
                          width="17"
                          height="17"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                          className="mt-0.5 shrink-0 text-dim-cream"
                        >
                          <circle cx="12" cy="12" r="9" />
                          <path d="M12 7v5l3 2" />
                        </svg>
                        <span className="text-dim-cream">
                          {selected.hours ?? l.hours}
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <svg
                          width="17"
                          height="17"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                          className="mt-0.5 shrink-0 text-dim-cream"
                        >
                          <path d="M12 3l2.5 5.3 5.5.8-4 3.9.9 5.7L12 22l-4.9-2.6.9-5.7-4-3.9 5.5-.8z" />
                        </svg>
                        <span className="text-dim-cream">
                          {selected.specials ?? l.specials}
                        </span>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-col gap-2.5">
                      <button
                        type="button"
                        className="btn btn-sm btn-primary w-full"
                      >
                        {l.reserveLabel}
                      </button>
                      <a
                        href={directions}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-ghost w-full"
                      >
                        {l.directionsLabel}
                      </a>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="border-b border-cream/10 px-5 py-3.5">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-dim-cream">
                    {l.items.length} locations · tap to view
                  </p>
                </div>
                <div className="flex-1 overflow-y-auto p-2">
                  {l.items.map((loc) => (
                    <button
                      key={`${loc.city}-${loc.state}`}
                      type="button"
                      onClick={() => setSelected(loc)}
                      className="group flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition-colors hover:bg-cream/5"
                    >
                      <PinGlyph className="shrink-0 text-dim-cream transition-colors group-hover:text-cream" />
                      <div className="min-w-0 flex-1">
                        <h3 className="truncate font-display text-base text-cream">
                          {loc.city}
                        </h3>
                        <p className="text-[0.64rem] uppercase tracking-[0.16em] text-dim-cream">
                          {STATE_NAMES[loc.state] ?? loc.state}
                        </p>
                      </div>
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
                        className="shrink-0 -translate-x-1 text-dim-cream opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                      >
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
