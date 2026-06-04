import { content } from "@/content";
import CurtainIntro from "@/components/CurtainIntro";
import HeroVideo from "@/components/HeroVideo";

function PinIcon() {
  return (
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
  );
}

export default function Hero() {
  const h = content.hero;
  const delays = [0, 150, 300, 440];

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col px-6 pb-6 pt-[80px] sm:px-8 sm:pb-8"
      style={{
        background:
          "radial-gradient(100% 78% at 50% 16%, #241a13 0%, #0d0a08 50%, #070504 80%)",
      }}
    >
      <div className="relative z-0 flex-1 overflow-hidden rounded-3xl border-[3px] border-cream/35 shadow-[0_45px_90px_-30px_rgba(0,0,0,0.9),0_0_60px_-12px_rgba(255,210,156,0.1)]">
          {/* Full-bleed background — crossfading video playlist if set, else image */}
          {h.video && h.video.length > 0 ? (
            <HeroVideo sources={h.video} poster={h.image} />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={h.image}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full animate-heroZoom object-cover"
            />
          )}

          {/* Edge vignette */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(125% 110% at 50% 40%, transparent 38%, rgba(7,5,4,0.76) 100%)",
            }}
          />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/70 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent" />

          {/* Left scrim so the left-aligned headline reads over the photo */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(6,4,3,0.74) 0%, rgba(6,4,3,0.25) 40%, transparent 62%)",
            }}
          />
          {/* Stage spotlights — painted OVER the scrims (screen blend) so the
              beams glow against the darkened left. One rakes down onto the
              headline, one onto the dish, plus a soft pool lifting the headline. */}
          <div
            className="pointer-events-none absolute inset-0 mix-blend-screen"
            style={{
              background:
                "conic-gradient(from 0deg at 13% -22%, transparent 137deg, rgba(255,210,156,0.34) 159deg, rgba(255,210,156,0.34) 168deg, transparent 191deg), " +
                "conic-gradient(from 0deg at 87% -22%, transparent 169deg, rgba(255,210,156,0.36) 191deg, rgba(255,210,156,0.36) 201deg, transparent 223deg), " +
                "radial-gradient(48% 52% at 23% 50%, rgba(255,210,156,0.18) 0%, transparent 72%)",
            }}
          />

          {/* Headline + buttons — left, vertically centered */}
          <div className="absolute inset-0 flex items-center">
            <div className="mx-auto w-full max-w-shell px-6 sm:px-10">
              <div className="max-w-2xl">
                <h1
                  className="animate-riseIn font-sans text-6xl font-medium uppercase leading-[0.98] tracking-tight text-cream [text-shadow:0_1px_0_rgba(255,255,255,0.18),0_2px_4px_rgba(0,0,0,0.75),0_6px_16px_rgba(0,0,0,0.8),0_20px_46px_rgba(0,0,0,0.62),0_0_48px_rgba(255,210,156,0.2)] sm:text-7xl lg:text-8xl"
                  style={{ animationDelay: `${delays[0]}ms` }}
                >
                  {h.headlineLead} {h.headlineEmphasis}
                </h1>
                <div
                  className="mt-8 flex animate-riseIn flex-col items-start gap-3.5 sm:flex-row sm:items-center"
                  style={{ animationDelay: `${delays[1]}ms` }}
                >
                  <a
                    href="#locations"
                    className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-gradient-to-b from-white to-cream px-7 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-ink shadow-[0_14px_30px_-8px_rgba(0,0,0,0.72),0_4px_10px_-4px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.9)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_42px_-8px_rgba(0,0,0,0.82),0_6px_14px_-4px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.95)]"
                  >
                    <PinIcon />
                    {h.cta}
                  </a>
                  <a
                    href="#signatures"
                    className="inline-flex items-center justify-center gap-2.5 rounded-lg border border-cream/60 bg-ink/25 px-7 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-cream shadow-[0_12px_26px_-10px_rgba(0,0,0,0.82),inset_0_1px_0_rgba(245,239,230,0.16)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-cream hover:text-ink hover:shadow-[0_18px_34px_-10px_rgba(0,0,0,0.85)]"
                  >
                    {h.ctaSecondary}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Localized scrim so the bottom-right quote reads over the bright plate */}
          <div
            className="pointer-events-none absolute bottom-0 right-0 h-3/5 w-3/5"
            style={{
              background:
                "radial-gradient(125% 100% at 100% 100%, rgba(6,4,3,0.82) 0%, rgba(6,4,3,0.4) 40%, transparent 70%)",
            }}
          />

          {/* The sentence, as an italic quote — bottom-right */}
          <div className="absolute inset-x-0 bottom-0">
            <div className="mx-auto flex w-full max-w-shell justify-end px-6 pb-10 sm:px-10 sm:pb-12">
              <p
                className="hidden max-w-sm animate-riseIn text-right font-display text-lg italic leading-snug text-cream [text-shadow:0_2px_22px_rgba(0,0,0,0.98),0_1px_4px_rgba(0,0,0,0.92)] sm:block lg:max-w-md lg:text-xl"
                style={{ animationDelay: `${delays[2]}ms` }}
              >
                &ldquo;{h.subhead}&rdquo;
              </p>
            </div>
          </div>

          {/* Theatre curtain — opens within the framed "stage" only; the nav,
              logo and black mat stay visible the whole time. */}
          <CurtainIntro />
      </div>

      {/* Brand logo — oversized, overlapping the hero's top-right. Lives in the
          hero (not the fixed nav) so it scrolls away instead of floating over
          the rest of the page. A small logo fades into the nav on scroll. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20">
        <div className="mx-auto flex max-w-shell justify-end px-5 pt-3 sm:px-8 sm:pt-4">
          {content.brandLogo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={content.brandLogo}
              alt={content.brand}
              className="h-24 w-auto drop-shadow-[0_2px_18px_rgba(0,0,0,0.55)] sm:h-32"
            />
          ) : (
            <span className="font-display text-4xl leading-none tracking-tight text-cream sm:text-6xl">
              {content.brandMark}
              <span className="align-super text-[0.45em] text-cream/55">©</span>
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
