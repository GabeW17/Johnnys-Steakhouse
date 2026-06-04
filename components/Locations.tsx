"use client";

import { useState } from "react";
import { content, type LocationItem } from "@/content";
import Reveal from "./Reveal";
import LocationsMap from "./LocationsMap";
import LocationCard from "./LocationCard";

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

export default function Locations() {
  const l = content.locations;
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<LocationItem | null>(null);

  const query = q.trim().toLowerCase();
  const items = query
    ? l.items.filter((loc) => {
        const state = (STATE_NAMES[loc.state] ?? loc.state).toLowerCase();
        return (
          loc.city.toLowerCase().includes(query) ||
          loc.state.toLowerCase().includes(query) ||
          state.includes(query)
        );
      })
    : l.items;

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

        {/* The map — every venue plotted, framed like the stage */}
        <div className="relative mt-12">
          <div
            className="pointer-events-none absolute -inset-4 rounded-[2rem]"
            style={{
              background:
                "radial-gradient(closest-side, rgba(255,210,156,0.10) 0%, transparent 72%)",
            }}
          />
          <div className="relative isolate h-[360px] overflow-hidden rounded-3xl border-2 border-cream/35 shadow-[0_45px_90px_-35px_rgba(0,0,0,0.92)] sm:h-[460px]">
            <LocationsMap onSelect={setSelected} />
          </div>
        </div>

        {/* Search — live-filters the directory */}
        <Reveal delay={120} className="mx-auto mt-10 max-w-md">
          <div className="relative">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-dim-cream"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" />
            </svg>
            <input
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={l.searchPlaceholder}
              aria-label={l.searchPlaceholder}
              className="w-full rounded-full border border-cream/15 bg-[#161616] py-3.5 pl-11 pr-4 text-sm text-cream placeholder:text-dim-cream focus:border-cream/40 focus:outline-none"
            />
          </div>
        </Reveal>

        {/* Directory */}
        {items.length > 0 ? (
          <Reveal
            delay={120}
            className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {items.map((loc) => (
              <button
                key={`${loc.city}-${loc.state}`}
                type="button"
                onClick={() => setSelected(loc)}
                className="group flex items-center gap-3 rounded-xl border border-cream/12 bg-[#161616] px-5 py-4 text-left transition-all duration-300 hover:-translate-y-1 hover:border-cream/30 hover:bg-[#1a1a1a]"
              >
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
                  className="shrink-0 text-dim-cream transition-colors group-hover:text-cream"
                >
                  <path d="M12 21s-7-5.686-7-11a7 7 0 1 1 14 0c0 5.314-7 11-7 11Z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-display text-lg leading-tight text-cream">
                    {loc.city}
                  </h3>
                  <p className="text-[0.7rem] uppercase tracking-[0.16em] text-dim-cream">
                    {STATE_NAMES[loc.state] ?? loc.state}
                  </p>
                </div>
                <svg
                  width="15"
                  height="15"
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
          </Reveal>
        ) : (
          <p className="mt-12 text-center text-dim-cream">
            No locations match &ldquo;{q}&rdquo;.
          </p>
        )}

        {selected && (
          <LocationCard loc={selected} onClose={() => setSelected(null)} />
        )}
      </div>
    </section>
  );
}
