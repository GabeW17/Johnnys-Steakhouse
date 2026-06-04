import { content } from "@/content";

export default function Footer() {
  const f = content.footer;
  // Duplicated so the marquee can translate -50% and loop seamlessly.
  const strip = [...f.gallery, ...f.gallery];

  return (
    <footer className="relative overflow-hidden border-t border-cream/15 bg-ink pb-28 pt-16 md:pb-16">
      {/* warm closing glow */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-64"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(50% 100% at 50% 0%, rgba(255,210,156,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Closing call to action */}
      <div className="relative mx-auto flex max-w-shell flex-col items-center gap-7 px-6 text-center sm:px-8">
        <h2 className="font-display text-3xl font-semibold leading-tight text-cream sm:text-4xl lg:text-5xl">
          {f.ctaLine}
        </h2>
        <a
          href={f.ctaHref}
          className="btn btn-primary inline-flex items-center gap-2.5"
        >
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
          >
            <path d="M12 21s-7-5.686-7-11a7 7 0 1 1 14 0c0 5.314-7 11-7 11Z" />
            <circle cx="12" cy="10" r="2.5" />
          </svg>
          {f.cta}
        </a>
      </div>

      {/* Dish filmstrip — full-bleed, slow continuous scroll, edge-faded */}
      <div className="marquee-mask relative mt-12 overflow-hidden sm:mt-14">
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {strip.map((src, i) => (
            <div
              key={i}
              className="relative mr-3 h-24 w-36 shrink-0 overflow-hidden rounded-xl border border-cream/10 shadow-[0_18px_36px_-22px_rgba(0,0,0,0.9)] ring-1 ring-inset ring-white/[0.06] sm:mr-4 sm:h-28 sm:w-44"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="h-full w-full object-cover"
              />
              {/* gentle warm darkening so the strip sits in the candlelit room */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(7,5,4,0.12) 0%, transparent 38%, rgba(7,5,4,0.32) 100%)",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Brand */}
      <div className="relative mx-auto mt-12 flex max-w-shell flex-col items-center gap-3 border-t border-cream/10 px-6 pt-10 text-center sm:px-8 sm:mt-14">
        <p className="font-display text-2xl font-semibold text-cream">
          {f.brand}
        </p>
        <p className="text-sm text-dim-cream">{f.tagline}</p>
      </div>
    </footer>
  );
}
