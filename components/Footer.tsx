import { content } from "@/content";

export default function Footer() {
  const f = content.footer;

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

      <div className="relative mx-auto max-w-shell px-6 sm:px-8">
        {/* Closing call to action */}
        <div className="flex flex-col items-center gap-7 border-b border-cream/10 pb-14 text-center">
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

        {/* Brand */}
        <div className="flex flex-col items-center gap-3 pt-10 text-center">
          <p className="font-display text-2xl font-semibold text-cream">
            {f.brand}
          </p>
          <p className="text-sm text-dim-cream">{f.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
