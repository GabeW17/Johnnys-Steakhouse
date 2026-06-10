"use client";

import { useEffect, useState } from "react";
import type { Promo } from "@/content";

function activeNow(p: Promo, today: string, weekday: number): boolean {
  if (!p.enabled) return false;
  if (p.start && today < p.start) return false;
  if (p.end && today > p.end) return false;
  // weekly recurrence: if specific days are set, only show on those weekdays
  if (p.days && p.days.length > 0 && !p.days.includes(weekday)) return false;
  return true;
}

/**
 * Shows the promos that are live *right now* for this page (by schedule window
 * + target). If more than one is active, they shuffle on a timer. Display only —
 * promos are created/scheduled/toggled in the platform.
 */
export default function Promos({ promos, target }: { promos: Promo[]; target: string }) {
  const [active, setActive] = useState<Promo[]>([]);
  const [i, setI] = useState(0);

  useEffect(() => {
    const now = new Date();
    const today = now.toISOString().slice(0, 10);
    const weekday = now.getDay();
    setActive((promos ?? []).filter((p) => p.target === target && activeNow(p, today, weekday)));
  }, [promos, target]);

  useEffect(() => {
    if (active.length < 2) return;
    const t = setInterval(() => setI((x) => (x + 1) % active.length), 5000);
    return () => clearInterval(t);
  }, [active]);

  if (active.length === 0) return null;
  const current = i % active.length;
  const p = active[current];

  return (
    <section className="relative overflow-hidden border-y border-cream/12">
      {/* crossfading backgrounds */}
      {active.map((promo, idx) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={promo.id}
          src={promo.image}
          alt=""
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${idx === current ? "opacity-100" : "opacity-0"}`}
        />
      ))}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to right, rgba(8,6,4,0.95) 0%, rgba(8,6,4,0.82) 45%, rgba(8,6,4,0.5) 100%)" }}
      />

      <div className="relative mx-auto flex max-w-shell flex-col items-start gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div key={p.id} className="animate-riseIn">
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.24em]" style={{ color: "rgba(255,210,156,0.92)" }}>
            Featured this week
          </p>
          <p className="mt-1.5 font-display text-xl font-semibold leading-tight text-cream sm:text-2xl">
            {p.message}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-4">
          {active.length > 1 && (
            <div className="hidden items-center gap-1.5 sm:flex">
              {active.map((promo, idx) => (
                <span
                  key={promo.id}
                  className={`h-1.5 rounded-full transition-all ${idx === current ? "w-5 bg-cream" : "w-1.5 bg-cream/40"}`}
                />
              ))}
            </div>
          )}
          <a
            href={p.buttonHref}
            className="inline-flex items-center justify-center rounded-lg bg-gradient-to-b from-white to-cream px-6 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-ink shadow-[0_14px_30px_-8px_rgba(0,0,0,0.72),inset_0_1px_0_rgba(255,255,255,0.9)] transition-all duration-300 hover:-translate-y-0.5"
          >
            {p.buttonLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
