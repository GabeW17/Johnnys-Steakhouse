import { content } from "@/content";

export default function Footer() {
  const f = content.footer;
  // Duplicated so the marquee can translate -50% and loop seamlessly.
  const strip = [...f.gallery, ...f.gallery];

  return (
    <footer className="relative overflow-hidden border-t border-cream/15 bg-ink">
      {/* ===== Closing CTA — dishes scroll as a darkened background ===== */}
      <section className="relative overflow-hidden">
        {/* Scrolling dish backdrop */}
        <div
          className="pointer-events-none absolute inset-0 scale-[1.06] [filter:brightness(0.78)_blur(1px)]"
          aria-hidden="true"
        >
          <div className="flex h-full w-max animate-marquee will-change-transform hover:[animation-play-state:paused]">
            {strip.map((src, i) => (
              <div key={i} className="h-full w-[58vw] shrink-0 sm:w-[26rem]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Dark scrim — darker at the edges (blend into footer) + behind the text */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(70% 92% at 50% 50%, rgba(7,5,4,0.5) 0%, rgba(7,5,4,0.28) 55%, transparent 100%), " +
              "linear-gradient(180deg, rgba(7,5,4,0.9) 0%, rgba(7,5,4,0.34) 28%, rgba(7,5,4,0.34) 72%, rgba(7,5,4,0.94) 100%)",
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
          <h2 className="font-display text-3xl font-semibold leading-tight text-cream [text-shadow:0_2px_24px_rgba(0,0,0,0.9),0_1px_4px_rgba(0,0,0,0.8)] sm:text-4xl lg:text-5xl">
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
      </section>

      {/* ===== Brand ===== */}
      <div className="relative mx-auto flex max-w-shell flex-col items-center gap-3 border-t border-cream/10 px-6 pb-28 pt-10 text-center sm:px-8 md:pb-14">
        <p className="font-display text-2xl font-semibold text-cream">
          {f.brand}
        </p>
        <p className="text-sm text-dim-cream">{f.tagline}</p>
      </div>
    </footer>
  );
}
