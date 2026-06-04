import { content } from "@/content";
import Reveal from "./Reveal";

export default function Signatures() {
  const m = content.manifesto;
  const s = content.signatures;

  return (
    <section
      id="signatures"
      className="relative overflow-hidden border-t border-cream/10 bg-ink py-20 sm:py-24 lg:py-28"
    >
      {/* Two soft side spotlights converging on the three-act title */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[34rem] mix-blend-screen"
        aria-hidden="true"
        style={{
          background:
            "conic-gradient(from 0deg at -2% 26%, transparent 74deg, rgba(255,210,156,0.16) 90deg, rgba(255,210,156,0.16) 97deg, transparent 113deg)," +
            "conic-gradient(from 0deg at 102% 26%, transparent 247deg, rgba(255,210,156,0.16) 263deg, rgba(255,210,156,0.16) 270deg, transparent 286deg)",
          maskImage:
            "linear-gradient(to bottom, #000 0%, #000 36%, transparent 74%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, #000 0%, #000 36%, transparent 74%)",
        }}
      />
      <div className="relative mx-auto max-w-shell px-6 sm:px-8">
        {/* The three-act headline — one horizontal marquee, not stacked */}
        <Reveal className="mx-auto max-w-shell text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-cream/25 sm:w-12" />
            <p className="eyebrow">{m.eyebrow}</p>
            <span className="h-px w-8 bg-cream/25 sm:w-12" />
          </div>
          <h2 className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-1 font-sans text-2xl font-extrabold uppercase tracking-tight text-cream [text-shadow:0_0_44px_rgba(255,210,156,0.18),0_2px_16px_rgba(0,0,0,0.55)] sm:text-4xl lg:text-[2.7rem]">
            {m.lines.map((line, i) => (
              <span
                key={line}
                className="inline-flex items-center gap-x-5 whitespace-nowrap"
              >
                {line.replace(/\.$/, "")}
                {i < m.lines.length - 1 && (
                  <span aria-hidden="true" className="text-[0.42em] text-cream/40">
                    ◆
                  </span>
                )}
              </span>
            ))}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-dim-cream sm:text-lg">
            {m.body}
          </p>
        </Reveal>

        {/* The headliners — a billing of tonight's signatures */}
        <Reveal className="mt-16 flex items-center justify-center gap-5 sm:mt-20">
          <span className="h-px w-10 bg-cream/20 sm:w-16" />
          <p className="font-display text-lg italic text-cream/80 sm:text-xl">
            {s.heading}
          </p>
          <span className="h-px w-10 bg-cream/20 sm:w-16" />
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {s.dishes.map((dish, i) => (
            <Reveal
              as="article"
              key={dish.name}
              delay={i * 110}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-cream/35 bg-[#161616] shadow-[0_28px_60px_-32px_rgba(0,0,0,0.92)] transition-all duration-500 hover:-translate-y-2 hover:border-cream/55 hover:shadow-[0_46px_90px_-30px_rgba(0,0,0,1)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                />
                {/* keep the food crisp — only soft scrims for the index + a thin
                    blend into the panel at the very bottom edge */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/45 to-transparent" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#161616]/90 to-transparent" />
                <span className="absolute left-5 top-4 font-display text-sm italic tracking-wide text-cream/85 [text-shadow:0_1px_8px_rgba(0,0,0,0.9)]">
                  No.&nbsp;{String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                {dish.tag && (
                  <p className="mb-2.5 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-dim-cream/75">
                    {dish.tag}
                  </p>
                )}
                <div className="flex items-baseline gap-3">
                  <h3 className="font-display text-2xl font-semibold leading-tight text-cream">
                    {dish.name}
                  </h3>
                  {/* menu-style leader between name and price */}
                  <span className="mb-1.5 h-px flex-1 bg-cream/15" />
                  <span className="font-display text-xl text-cream/95">
                    {dish.price}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-dim-cream">
                  {dish.description}
                </p>
              </div>
            </Reveal>
            ))}
        </div>

        <Reveal className="mt-14 text-center">
          <a href="#signatures" className="btn btn-ghost">
            {s.cta}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
