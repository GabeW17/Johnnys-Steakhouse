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

// The audience fans out in a half-circle below the heading (the stage):
// outer cards ride high near the stage, the center card dips lowest.
// On mobile everything just stacks.
const ARC = [
  "lg:absolute lg:left-[0.5%] lg:top-[2%] lg:w-[19%]",
  "lg:absolute lg:left-[20.5%] lg:top-[23%] lg:w-[19%]",
  "lg:absolute lg:left-1/2 lg:top-[39%] lg:w-[20%] lg:-translate-x-1/2",
  "lg:absolute lg:right-[20.5%] lg:top-[23%] lg:w-[19%]",
  "lg:absolute lg:right-[0.5%] lg:top-[2%] lg:w-[19%]",
];

export default function Proof() {
  const p = content.proof;
  const reviews = p.reviews.slice(0, 5);

  return (
    <section className="relative overflow-hidden border-t border-cream/10 bg-ink py-16 sm:py-20 lg:py-24">
      <div className="relative mx-auto max-w-shell px-6 sm:px-8">
        {/* The stage — heading at the top */}
        <Reveal className="mx-auto max-w-2xl text-center">
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

        {/* The audience — a half-circle of review cards below the stage */}
        <div className="relative mt-12 sm:mt-14 lg:mt-10 lg:h-[33rem]">
          {/* warm light pooling over the audience */}
          <div
            className="pointer-events-none absolute left-1/2 top-0 hidden h-[26rem] w-[52rem] max-w-full -translate-x-1/2 lg:block"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(60% 70% at 50% 30%, rgba(255,210,156,0.07) 0%, transparent 72%)",
            }}
          />
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
      </div>
    </section>
  );
}
