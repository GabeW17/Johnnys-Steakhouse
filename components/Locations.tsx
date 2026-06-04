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

function milesBetween(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number }
) {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const R = 3958.8;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}
const fmtMiles = (d: number) =>
  (d < 10 ? d.toFixed(1) : Math.round(d).toString()) + " mi";

export default function Locations() {
  const l = content.locations;
  const [selected, setSelected] = useState<LocationItem | null>(null);
  const [hovered, setHovered] = useState<LocationItem | null>(null);
  const [q, setQ] = useState("");
  const [userLoc, setUserLoc] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [geoStatus, setGeoStatus] = useState<"idle" | "loading" | "error">(
    "idle"
  );

  const directions = selected
    ? `https://www.google.com/maps/search/?api=1&query=${selected.lat},${selected.lng}`
    : "#";

  const query = q.trim().toLowerCase();
  let rows = l.items.map((loc) => ({
    loc,
    dist: userLoc ? milesBetween(userLoc, loc) : null,
  }));
  if (query) {
    rows = rows.filter(({ loc }) => {
      const sn = (STATE_NAMES[loc.state] ?? loc.state).toLowerCase();
      return (
        loc.city.toLowerCase().includes(query) ||
        loc.state.toLowerCase().includes(query) ||
        sn.includes(query)
      );
    });
  }
  if (userLoc) rows.sort((a, b) => (a.dist as number) - (b.dist as number));

  const locate = () => {
    if (userLoc) {
      setUserLoc(null);
      setGeoStatus("idle");
      return;
    }
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setGeoStatus("error");
      return;
    }
    setGeoStatus("loading");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLoc({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setGeoStatus("idle");
      },
      () => setGeoStatus("error"),
      { timeout: 8000 }
    );
  };

  return (
    <section
      id="locations"
      className="relative overflow-hidden border-t border-cream/10 bg-ink py-24 sm:py-32"
    >
      {/* Warm candlelit glow, matching the rest of the site */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute inset-x-0 top-0 h-80"
          style={{
            background:
              "radial-gradient(55% 100% at 50% 0%, rgba(255,210,156,0.12) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute left-1/2 top-1/2 h-[42rem] w-[64rem] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(255,210,156,0.06) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -left-24 top-1/4 h-[30rem] w-[30rem] rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(255,210,156,0.06) 0%, transparent 72%)",
          }}
        />
        <div
          className="absolute -right-24 bottom-[12%] h-[28rem] w-[28rem] rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(255,210,156,0.055) 0%, transparent 72%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-shell px-6 sm:px-8">
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

        {/* Store locator — a full map with the menu/detail floating on top */}
        <div className="relative mt-12">
          <div
            className="pointer-events-none absolute -inset-8 rounded-[2.6rem]"
            style={{
              background:
                "radial-gradient(closest-side, rgba(255,210,156,0.17) 0%, transparent 72%)",
            }}
          />
          <div className="relative isolate h-[540px] overflow-hidden rounded-3xl border-2 border-cream/35 shadow-[0_60px_120px_-32px_rgba(0,0,0,0.95),0_26px_55px_-30px_rgba(0,0,0,0.85)] ring-1 ring-inset ring-cream/10 sm:h-[620px]">
            <div className="absolute inset-0 z-0">
              <LocationsMap
                onSelect={setSelected}
                focus={selected}
                hovered={hovered}
                userLoc={userLoc}
                onReset={() => setSelected(null)}
              />
            </div>

            {/* top-edge sheen — lifts the card off the section */}
            <div className="pointer-events-none absolute inset-x-8 top-0 z-[5] h-px bg-gradient-to-r from-transparent via-cream/45 to-transparent" />

            <div className="absolute bottom-3 left-3 right-3 top-auto z-10 flex max-h-[58%] flex-col overflow-hidden rounded-2xl border border-cream/20 bg-[#100f0e]/95 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9)] sm:bottom-4 sm:left-4 sm:right-auto sm:top-4 sm:max-h-none sm:w-[358px]">
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
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#100f0e] via-transparent to-black/20" />
                    </div>

                    <div className="p-5">
                      <p className="eyebrow">{content.brand}</p>
                      <h3 className="mt-1.5 font-display text-2xl font-semibold text-cream">
                        {selected.city}, {selected.state}
                      </h3>
                      {userLoc && (
                        <p className="mt-1 text-xs font-medium uppercase tracking-[0.14em] text-dim-cream">
                          {fmtMiles(milesBetween(userLoc, selected))} away
                        </p>
                      )}

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
                  <div className="border-b border-cream/10 px-5 pb-4 pt-4">
                    <p className="text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-dim-cream">
                      {l.eyebrow}
                    </p>
                    <div className="relative mt-3">
                      <svg
                        width="15"
                        height="15"
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
                        className="w-full rounded-full border border-cream/20 bg-cream/[0.04] py-2.5 pl-10 pr-4 text-sm text-cream placeholder:text-dim-cream/70 focus:border-cream/45 focus:outline-none"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={locate}
                      className={`mt-2.5 flex w-full items-center justify-center gap-2 rounded-full border py-2 text-[0.62rem] font-semibold uppercase tracking-[0.18em] transition-colors ${
                        userLoc
                          ? "border-cream/40 text-cream"
                          : "border-cream/15 text-dim-cream hover:border-cream/40 hover:text-cream"
                      }`}
                    >
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.9"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <circle cx="12" cy="12" r="3.5" />
                        <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
                      </svg>
                      {userLoc
                        ? "Sorted by distance · reset"
                        : geoStatus === "loading"
                        ? "Locating…"
                        : "Use my location"}
                    </button>
                    {geoStatus === "error" && (
                      <p className="mt-2 text-center text-[0.62rem] text-dim-cream">
                        Couldn&rsquo;t get your location.
                      </p>
                    )}
                  </div>

                  <div className="flex-1 overflow-y-auto px-2 py-1.5">
                    {rows.map(({ loc, dist }, i) => {
                      const isNearest = !!userLoc && !query && i === 0;
                      return (
                        <button
                          key={`${loc.city}-${loc.state}`}
                          type="button"
                          onClick={() => setSelected(loc)}
                          onMouseEnter={() => setHovered(loc)}
                          onMouseLeave={() => setHovered(null)}
                          className="group flex w-full items-center gap-2.5 rounded-lg px-3 py-3 text-left transition-colors hover:bg-cream/[0.05]"
                        >
                          <span className="shrink-0 font-display text-[1.05rem] leading-none text-cream transition-colors group-hover:text-white">
                            {loc.city}
                          </span>
                          {isNearest && (
                            <span className="shrink-0 rounded-full bg-cream/15 px-1.5 py-0.5 text-[0.5rem] font-semibold uppercase tracking-[0.12em] text-cream">
                              Nearest
                            </span>
                          )}
                          <span className="h-px flex-1 bg-cream/10" />
                          {dist != null ? (
                            <span className="shrink-0 text-[0.66rem] font-semibold tabular-nums text-cream/90">
                              {fmtMiles(dist)}
                            </span>
                          ) : (
                            <span className="shrink-0 text-[0.58rem] uppercase tracking-[0.18em] text-dim-cream">
                              {STATE_NAMES[loc.state] ?? loc.state}
                            </span>
                          )}
                          <svg
                            width="13"
                            height="13"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                            className="shrink-0 text-cream opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                          >
                            <path d="M5 12h14M13 6l6 6-6 6" />
                          </svg>
                        </button>
                      );
                    })}
                    {rows.length === 0 && (
                      <p className="px-3 py-8 text-center text-sm text-dim-cream">
                        No locations match &ldquo;{q}&rdquo;.
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
