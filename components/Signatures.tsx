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
      {/* Performance lighting — a rig of stage beams fanning down from the top
          plus soft out-of-focus bokeh, all behind the content */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        {/* the beams */}
        <div
          className="absolute inset-x-0 top-0 h-[44rem] mix-blend-screen"
          style={{
            background:
              "conic-gradient(from 180deg at 18% -10%, transparent 171deg, rgba(245,239,230,0.10) 178deg, rgba(245,239,230,0.10) 182deg, transparent 189deg)," +
              "conic-gradient(from 180deg at 34% -10%, transparent 173deg, rgba(245,239,230,0.07) 179deg, rgba(245,239,230,0.07) 181deg, transparent 187deg)," +
              "conic-gradient(from 180deg at 50% -10%, transparent 170deg, rgba(245,239,230,0.14) 178deg, rgba(245,239,230,0.14) 182deg, transparent 190deg)," +
              "conic-gradient(from 180deg at 66% -10%, transparent 173deg, rgba(245,239,230,0.07) 179deg, rgba(245,239,230,0.07) 181deg, transparent 187deg)," +
              "conic-gradient(from 180deg at 82% -10%, transparent 171deg, rgba(245,239,230,0.10) 178deg, rgba(245,239,230,0.10) 182deg, transparent 189deg)",
          }}
        />
        {/* soft pool lifting the title */}
        <div
          className="absolute inset-x-0 top-0 h-[26rem]"
          style={{
            background:
              "radial-gradient(38% 60% at 50% 30%, rgba(245,239,230,0.08) 0%, transparent 70%)",
          }}
        />
        {/* out-of-focus stage lights */}
        <div className="absolute left-[6%] top-[16%] h-20 w-20 rounded-full bg-cream/[0.06] blur-2xl" />
        <div className="absolute right-[7%] top-[11%] h-28 w-28 rounded-full bg-cream/[0.05] blur-3xl" />
        <div className="absolute left-[15%] top-[58%] h-24 w-24 rounded-full bg-cream/[0.04] blur-3xl" />
        <div className="absolute right-[13%] top-[62%] h-16 w-16 rounded-full bg-cream/[0.05] blur-2xl" />
      </div>

      <div className="relative mx-auto max-w-shell px-6 sm:px-8">
        {/* The three-act headline — one horizontal marquee, not stacked */}
        <Reveal className="mx-auto max-w-shell text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-cream/25 sm:w-12" />
            <p className="eyebrow">{m.eyebrow}</p>
            <span className="h-px w-8 bg-cream/25 sm:w-12" />
          </div>
          <h2 className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-1 font-sans text-2xl font-extrabold uppercase tracking-tight text-cream [text-shadow:0_0_44px_rgba(245,239,230,0.18),0_2px_16px_rgba(0,0,0,0.55)] sm:text-4xl lg:text-[2.7rem]">
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
