import { content } from "@/content";
import Reveal from "./Reveal";

export default function Proof() {
  const p = content.proof;
  const reviews = p.reviews.slice(0, 3);

  return (
    <section className="relative overflow-hidden border-t border-cream/10 bg-ink py-16 sm:py-20 lg:py-24">
      <div className="relative mx-auto max-w-shell px-6 sm:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-cream/25" />
            <p className="eyebrow">{p.eyebrow}</p>
            <span className="h-px w-8 bg-cream/25" />
          </div>
          <h2 className="mt-5 font-display text-4xl font-semibold leading-tight text-cream sm:text-5xl lg:text-6xl">
            {p.heading}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-dim-cream sm:text-lg">
            {p.lead}
          </p>
          <p className="mt-4 text-xs uppercase tracking-[0.22em] text-dim-cream">
            Rated {p.rating} · {p.count}
          </p>
        </Reveal>

        {/* Three equal voices — testimonial cards */}
        <div className="mt-12 grid gap-6 sm:mt-14 sm:grid-cols-3 lg:gap-7">
          {reviews.map((r, i) => (
            <Reveal
              as="figure"
              key={i}
              delay={(i % 3) * 110}
              className="flex flex-col rounded-2xl border border-cream/15 bg-[#161616] p-7 text-left shadow-[0_30px_60px_-34px_rgba(0,0,0,0.95)] ring-1 ring-inset ring-white/[0.03] sm:p-8"
            >
              <span
                aria-hidden="true"
                className="block text-5xl leading-[0.4] text-cream/20"
              >
                &ldquo;
              </span>
              <blockquote className="mt-4 flex-1 text-base leading-relaxed text-cream/85 sm:text-[1.05rem]">
                {r.quote}
              </blockquote>
              <figcaption className="mt-6 border-t border-cream/10 pt-5 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-dim-cream">
                {r.author}
                <span className="mx-1.5 text-cream/30">·</span>
                {r.city}
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
