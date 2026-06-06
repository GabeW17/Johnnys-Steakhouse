import { content, type SiteContent } from "@/content";
import Reveal from "./Reveal";

export default function Atmosphere({ data }: { data?: SiteContent["atmosphere"] }) {
  const a = data ?? content.atmosphere;

  return (
    <section
      id="atmosphere"
      className="relative overflow-hidden border-t border-cream/10 bg-ink py-24 sm:py-28 lg:py-32"
    >
      {/* warm ambient glow on the photo side */}
      <div
        className="pointer-events-none absolute left-0 top-1/4 h-[40rem] w-[40rem] -translate-x-1/4 -translate-y-1/4 rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,210,156,0.1) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto grid max-w-shell items-center gap-12 px-6 sm:px-8 lg:grid-cols-12 lg:gap-x-16">
        {/* Photo */}
        <Reveal className="relative order-2 lg:order-1 lg:col-span-7">
          {/* warm glow spilling around the frame */}
          <div
            className="pointer-events-none absolute -inset-6 rounded-[2.25rem]"
            style={{
              background:
                "radial-gradient(closest-side, rgba(255,210,156,0.16) 0%, transparent 72%)",
            }}
          />
          <div className="group relative aspect-[4/5] overflow-hidden rounded-3xl border-2 border-cream/35 shadow-[0_45px_90px_-35px_rgba(0,0,0,0.92),0_0_60px_-4px_rgba(255,210,156,0.4)] ring-1 ring-inset ring-cream/10 transition-shadow duration-500 hover:shadow-[0_50px_100px_-35px_rgba(0,0,0,0.95),0_0_76px_-4px_rgba(255,210,156,0.55)] sm:aspect-[5/4] lg:aspect-auto lg:h-[34rem]">
            {/* top-edge sheen */}
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-cream/40 to-transparent" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={a.image}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
            />
            {/* vignette + warm bottom glow */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(125% 100% at 50% 28%, transparent 46%, rgba(7,5,4,0.62) 100%)",
              }}
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/75 to-transparent" />
          </div>
        </Reveal>

        {/* Copy */}
        <Reveal delay={120} className="order-1 lg:order-2 lg:col-span-5">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-cream/30" />
            <p className="eyebrow">{a.eyebrow}</p>
          </div>
          <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] text-cream sm:text-5xl">
            {a.heading}
          </h2>
          <div className="mt-6 space-y-5">
            {a.paragraphs.map((p, i) => (
              <p key={i} className="leading-relaxed text-dim-cream">
                {p}
              </p>
            ))}
          </div>

          {/* supper-club detail row */}
          <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-cream/10 pt-7 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-cream/65">
            {a.highlights.map((h, i) => (
              <span key={h} className="flex items-center gap-3">
                {i > 0 && (
                  <span
                    className="h-1 w-1 rounded-full bg-cream/30"
                    aria-hidden="true"
                  />
                )}
                {h}
              </span>
            ))}
          </div>

          <a
            href="#locations"
            className="mt-8 inline-flex items-center justify-center gap-2.5 rounded-lg bg-gradient-to-b from-white to-cream px-7 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-ink shadow-[0_14px_30px_-8px_rgba(0,0,0,0.72),0_4px_10px_-4px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.9)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_42px_-8px_rgba(0,0,0,0.82),0_6px_14px_-4px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.95)]"
          >
            {a.cta}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
