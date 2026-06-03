import { content } from "@/content";
import Reveal from "./Reveal";

export default function Locations() {
  const l = content.locations;

  return (
    <section
      id="locations"
      className="border-t border-cream/15 bg-ink py-24 sm:py-32"
    >
      <div className="mx-auto max-w-shell px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">{l.eyebrow}</p>
          <h2 className="mt-4 font-display text-4xl font-semibold text-cream sm:text-5xl">
            {l.heading}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-dim-cream">{l.subtext}</p>
        </Reveal>

        {/* Visual-only search */}
        <Reveal
          delay={80}
          className="mx-auto mt-9 flex max-w-xl flex-col gap-3 sm:flex-row"
        >
          <div className="relative flex-1">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-dim-cream"
            >
              🔍
            </span>
            <input
              type="text"
              placeholder={l.searchPlaceholder}
              aria-label={l.searchPlaceholder}
              className="w-full rounded-full border border-cream/15 bg-panel py-3.5 pl-11 pr-4 text-sm text-cream placeholder:text-dim-cream focus:border-cream/40 focus:outline-none"
            />
          </div>
          <button type="button" className="btn btn-primary">
            {l.searchCta}
          </button>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {l.items.map((loc, i) => (
            <Reveal
              key={`${loc.city}-${loc.state}`}
              delay={(i % 4) * 80}
              className={`rounded-xl border p-6 transition-colors ${
                loc.nearest
                  ? "border-cream/40 bg-panel"
                  : "border-cream/15 bg-espresso hover:border-cream/25"
              }`}
            >
              {loc.nearest && (
                <p className="mb-2 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-cream">
                  ● Nearest you
                </p>
              )}
              <h3 className="font-display text-xl text-cream">{loc.city}</h3>
              <p className="mt-1 text-sm text-dim-cream">{loc.state}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
