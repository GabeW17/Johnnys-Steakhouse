import { content } from "@/content";

function SocialIcon({ name }: { name: "instagram" | "facebook" }) {
  if (name === "facebook") {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M14 8.5V7c0-.83.67-1 1.5-1H17V3h-2.5C12 3 11 4.8 11 6.7V8.5H9V11h2v10h3V11h2.2l.3-2.5H14Z" />
      </svg>
    );
  }
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 21s-7-5.686-7-11a7 7 0 1 1 14 0c0 5.314-7 11-7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export default function Footer() {
  const f = content.footer;
  const loc = content.locations;
  const hourLines = loc.hours.split(/\s{2,}/).filter(Boolean);

  return (
    <footer className="relative overflow-hidden border-t border-cream/15 bg-ink">
      {/* ===== Closing CTA — a single candlelit photo, darkened ===== */}
      <section className="relative overflow-hidden">
        {/* Still photo backdrop */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={f.ctaImage}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover [filter:brightness(0.8)]"
          />
        </div>

        {/* Dark scrim — darker at the edges (blend into footer) + behind the text */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(70% 92% at 50% 50%, rgba(7,5,4,0.46) 0%, rgba(7,5,4,0.22) 55%, transparent 100%), " +
              "linear-gradient(180deg, rgba(7,5,4,0.88) 0%, rgba(7,5,4,0.26) 28%, rgba(7,5,4,0.26) 72%, rgba(7,5,4,0.94) 100%)",
          }}
        />
        {/* Warm candle glow over the top */}
        <div
          className="pointer-events-none absolute inset-0 mix-blend-screen"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(70% 130% at 50% 0%, rgba(255,210,156,0.12) 0%, transparent 58%)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 mx-auto flex max-w-shell flex-col items-center gap-7 px-6 py-24 text-center sm:px-8 sm:py-32">
          <h2 className="font-display text-3xl font-semibold leading-tight text-cream [text-shadow:0_1px_0_rgba(255,255,255,0.25),0_2px_5px_rgba(0,0,0,0.85),0_8px_20px_rgba(0,0,0,0.82),0_18px_44px_rgba(0,0,0,0.6),0_0_46px_rgba(255,210,156,0.22)] sm:text-4xl lg:text-5xl">
            {f.ctaLine}
          </h2>
          <a
            href={f.ctaHref}
            className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-gradient-to-b from-white to-cream px-7 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-ink shadow-[0_14px_30px_-8px_rgba(0,0,0,0.72),0_4px_10px_-4px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.9)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_42px_-8px_rgba(0,0,0,0.82),0_6px_14px_-4px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.95)]"
          >
            <PinIcon />
            {f.cta}
          </a>
        </div>
      </section>

      {/* ===== Footer body — warm two-tone grey base ===== */}
      <div className="relative border-t border-cream/10 bg-[#2a2824]">
        <div className="mx-auto max-w-shell px-6 pb-28 pt-16 sm:px-8 sm:pb-16">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.15fr] lg:gap-12">
            {/* Brand */}
            <div className="max-w-sm">
              {content.brandLogo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={content.brandLogo}
                  alt={f.brand}
                  className="h-16 w-auto"
                />
              ) : (
                <p className="font-display text-2xl font-semibold leading-none text-cream">
                  {f.brand}
                </p>
              )}
              <p className="mt-5 text-sm leading-relaxed text-dim-cream">
                {f.blurb}
              </p>
              <div className="mt-6 flex gap-3">
                {f.social.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 text-cream/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-cream/45 hover:bg-cream/[0.06] hover:text-cream"
                  >
                    <SocialIcon name={s.icon} />
                  </a>
                ))}
              </div>
            </div>

            {/* Explore */}
            <div>
              <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-cream/55">
                Explore
              </h3>
              <ul className="mt-5 space-y-3">
                {f.explore.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-sm text-dim-cream transition-colors hover:text-cream"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Locations */}
            <div>
              <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-cream/55">
                Locations
              </h3>
              <ul className="mt-5 space-y-3">
                {loc.items.slice(0, 5).map((l) => (
                  <li key={`${l.city}-${l.state}`}>
                    <a
                      href="#locations"
                      className="text-sm text-dim-cream transition-colors hover:text-cream"
                    >
                      {l.city}, {l.state}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="#locations"
                    className="text-sm font-medium text-cream/90 transition-colors hover:text-cream"
                  >
                    All locations →
                  </a>
                </li>
              </ul>
            </div>

            {/* Hours & reserve */}
            <div>
              <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-cream/55">
                Hours
              </h3>
              <div className="mt-5 space-y-1.5">
                {hourLines.map((line, i) => (
                  <p key={i} className="text-sm text-dim-cream">
                    {line}
                  </p>
                ))}
              </div>
              <a
                href="#locations"
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-cream transition-colors hover:text-white"
              >
                <PinIcon />
                Find a location
              </a>
            </div>
          </div>

          {/* Legal bar */}
          <div className="mt-14 flex flex-col gap-4 border-t border-cream/10 pt-7 text-xs text-dim-cream sm:flex-row sm:items-center sm:justify-between">
            <p>
              {f.copyright} · {f.tagline}
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {f.legal.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="transition-colors hover:text-cream"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
