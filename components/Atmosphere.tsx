import { content } from "@/content";
import Reveal from "./Reveal";

export default function Atmosphere() {
  const a = content.atmosphere;

  return (
    <section
      id="atmosphere"
      className="relative overflow-hidden border-t border-cream/10 bg-ink py-24 sm:py-28 lg:py-32"
    >
      {/* faint warm ambient glow on the photo side */}
      <div
        className="pointer-events-none absolute right-0 top-1/4 h-[36rem] w-[36rem] -translate-y-1/4 translate-x-1/4 rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,210,156,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto grid max-w-shell items-center gap-12 px-6 sm:px-8 lg:grid-cols-2 lg:gap-16">
        {/* Photo */}
        <Reveal className="relative order-2 lg:order-1">
          {/* warm glow spilling around the frame */}
          <div
            className="pointer-events-none absolute -inset-6 rounded-[2.25rem]"
            style={{
              background:
                "radial-gradient(closest-side, rgba(255,210,156,0.12) 0%, transparent 72%)",
            }}
          />
          <div className="relative overflow-hidden rounded-3xl border-2 border-cream/35 shadow-[0_45px_90px_-35px_rgba(0,0,0,0.92)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={a.image}
              alt=""
              aria-hidden="true"
              className="aspect-[4/5] w-full object-cover"
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
        <Reveal delay={120} className="order-1 lg:order-2">
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
          <a href="#visit" className="btn btn-primary mt-9">
            {a.cta}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
