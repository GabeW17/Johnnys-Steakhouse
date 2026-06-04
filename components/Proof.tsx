import { content } from "@/content";
import Reveal from "./Reveal";

export default function Proof() {
  const p = content.proof;
  const quotes = [{ quote: p.quote, author: p.author }, ...p.reviews].slice(0, 6);

  return (
    <section className="relative overflow-hidden border-t border-cream/10 bg-ink py-24 sm:py-32 lg:py-36">
      {/* Diagonal spotlights rising from the lower sides up to "A standing ovation" */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[42rem] mix-blend-screen"
        aria-hidden="true"
        style={{
          background:
            "conic-gradient(from 0deg at -6% 64%, transparent 30deg, rgba(255,210,156,0.16) 47deg, rgba(255,210,156,0.16) 55deg, transparent 73deg)," +
            "conic-gradient(from 0deg at 106% 64%, transparent 287deg, rgba(255,210,156,0.16) 305deg, rgba(255,210,156,0.16) 313deg, transparent 330deg)",
        }}
      />

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
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-dim-cream sm:text-lg">
            {p.lead}
          </p>
          <p className="mt-6 text-xs uppercase tracking-[0.22em] text-dim-cream">
            Rated {p.rating} · {p.count}
          </p>
        </Reveal>

        {/* the ovation — voices from the room */}
        <div className="mt-16 grid gap-x-12 gap-y-10 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3">
          {quotes.map((r, i) => (
            <Reveal
              as="figure"
              key={i}
              delay={(i % 3) * 110}
              className="border-t border-cream/15 pt-6 text-left"
            >
              <blockquote className="font-display text-lg italic leading-relaxed text-cream/85">
                &ldquo;{r.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-4 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-dim-cream">
                {r.author}
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
