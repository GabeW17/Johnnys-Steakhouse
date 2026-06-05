import { content } from "@/content";
import Reveal from "./Reveal";

function Stars() {
  return (
    <div className="flex gap-0.5 text-[#d3ad77]" aria-label="Rated 5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.402 8.169L12 18.896l-7.336 3.86 1.402-8.169L.132 9.21l8.2-1.192z" />
        </svg>
      ))}
    </div>
  );
}

// The audience wraps the heading in a half-circle: the OUTER cards ride up
// beside the words (left + right), the inner cards dip below, center lowest.
// On mobile everything just stacks.
const ARC = [
  "lg:absolute lg:left-0 lg:top-[6%] lg:w-[19%]", // far-left, beside the words
  "lg:absolute lg:left-[12%] lg:top-[49%] lg:w-[19%]", // mid-left, dipping down
  "lg:absolute lg:left-1/2 lg:top-[58%] lg:w-[20%] lg:-translate-x-1/2", // center, lowest
  "lg:absolute lg:right-[12%] lg:top-[49%] lg:w-[19%]", // mid-right, dipping down
  "lg:absolute lg:right-0 lg:top-[6%] lg:w-[19%]", // far-right, beside the words
];

export default function Proof() {
  const p = content.proof;
  const reviews = p.reviews.slice(0, 5);

  return (
    <section className="relative overflow-hidden border-t border-cream/10 bg-ink py-14 sm:py-16 lg:py-20">
      <div className="relative mx-auto max-w-shell px-6 sm:px-8 lg:h-[36rem]">
        {/* warm stage light over the center */}
        <div
          className="pointer-events-none absolute left-1/2 top-0 hidden h-[24rem] w-[46rem] max-w-full -translate-x-1/2 lg:block"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(60% 70% at 50% 25%, rgba(255,210,156,0.08) 0%, transparent 72%)",
          }}
        />

        {/* The stage — heading at the top, nestled in the opening of the arc */}
        <div className="relative z-10 mx-auto mb-12 max-w-2xl text-center lg:absolute lg:left-1/2 lg:top-[2%] lg:mb-0 lg:w-[44%] lg:max-w-lg lg:-translate-x-1/2">
          <Reveal>
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-cream/25" />
              <p className="eyebrow">{p.eyebrow}</p>
              <span className="h-px w-8 bg-cream/25" />
            </div>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-tight text-cream sm:text-5xl">
              {p.heading}
            </h2>
            <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-dim-cream sm:text-lg">
              {p.lead}
            </p>
            <p className="mt-4 text-xs uppercase tracking-[0.22em] text-dim-cream">
              Rated {p.rating} · {p.count}
            </p>
          </Reveal>
        </div>

        {/* The audience — a half-circle wrapping the heading */}
        {reviews.map((r, i) => (
          <div
            key={i}
            className={`mx-auto mb-6 max-w-sm last:mb-0 lg:mx-0 lg:mb-0 ${ARC[i]}`}
          >
            <Reveal
              as="figure"
              delay={120 + i * 90}
              className="flex flex-col rounded-2xl border border-cream/15 bg-[#161616] p-5 text-left shadow-[0_24px_50px_-30px_rgba(0,0,0,0.95),0_0_40px_-8px_rgba(255,210,156,0.3)] ring-1 ring-inset ring-white/[0.04] transition-all duration-500 hover:-translate-y-1.5 hover:border-cream/30 hover:shadow-[0_36px_70px_-30px_rgba(0,0,0,1),0_0_54px_-6px_rgba(255,210,156,0.5)]"
            >
              <Stars />
              <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-cream/85">
                &ldquo;{r.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-4 border-t border-cream/10 pt-3.5 text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-dim-cream">
                {r.author}
                <span className="mx-1.5 text-cream/30">·</span>
                {r.city}
              </figcaption>
            </Reveal>
          </div>
        ))}
      </div>
    </section>
  );
}
