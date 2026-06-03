import { content } from "@/content";
import Reveal from "./Reveal";

export default function Signatures() {
  const m = content.manifesto;
  const s = content.signatures;

  return (
    <section
      id="signatures"
      className="relative overflow-hidden border-t border-cream/10 bg-ink py-24 sm:py-32 lg:py-36"
    >
      {/* Faint stage glow up top, echoing the hero spotlights */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-72"
        style={{
          background:
            "radial-gradient(55% 100% at 50% 0%, rgba(245,239,230,0.07) 0%, transparent 72%)",
        }}
      />

      <div className="relative mx-auto max-w-shell px-6 sm:px-8">
        {/* The three-act headline — one horizontal marquee, not stacked */}
        <Reveal className="mx-auto max-w-shell text-center">
          <p className="eyebrow">{m.eyebrow}</p>
          <h2 className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-1 font-sans text-2xl font-extrabold uppercase tracking-tight text-cream sm:text-4xl lg:text-[2.7rem]">
            {m.lines.map((line, i) => (
              <span
                key={line}
                className="inline-flex items-center gap-x-5 whitespace-nowrap"
              >
                {line.replace(/\.$/, "")}
                {i < m.lines.length - 1 && (
                  <span aria-hidden="true" className="text-[0.42em] text-cream/35">
                    ◆
                  </span>
                )}
              </span>
            ))}
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-dim-cream sm:text-lg">
            {m.body}
          </p>
        </Reveal>

        {/* The headliners — a billing of tonight's signatures */}
        <Reveal className="mt-20 flex items-center justify-center gap-5 sm:mt-24">
          <span className="h-px w-10 bg-cream/20 sm:w-16" />
          <p className="font-display text-lg italic text-cream/80 sm:text-xl">
            {s.heading}
          </p>
          <span className="h-px w-10 bg-cream/20 sm:w-16" />
        </Reveal>

        <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {s.dishes.map((dish, i) => (
            <Reveal
              as="article"
              key={dish.name}
              delay={i * 120}
              className="group relative overflow-hidden rounded-2xl border border-cream/15 bg-panel shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)] transition-all duration-500 hover:-translate-y-2 hover:border-cream/35 hover:shadow-[0_44px_80px_-28px_rgba(0,0,0,1)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="h-full w-full object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-110"
                />
                {/* fade the photo into the card body + darken the top for the index */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-panel via-panel/10 to-transparent" />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/45 to-transparent" />
                <span className="absolute left-5 top-4 font-display text-base italic text-cream/90 [text-shadow:0_1px_10px_rgba(0,0,0,0.9)]">
                  No.&nbsp;{String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="p-6 sm:p-7">
                <div className="flex items-baseline gap-3">
                  <h3 className="font-display text-2xl font-semibold text-cream">
                    {dish.name}
                  </h3>
                  {/* menu-style leader between name and price */}
                  <span className="mb-1 h-px flex-1 bg-cream/20" />
                  <span className="font-display text-xl text-cream">
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
