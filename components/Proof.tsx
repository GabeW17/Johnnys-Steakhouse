import { content } from "@/content";
import Reveal from "./Reveal";

// Desktop scatter — the room arranged around the spotlit center quote.
const POS = [
  "lg:absolute lg:left-0 lg:top-[5%] lg:max-w-[15rem] lg:text-left",
  "lg:absolute lg:right-0 lg:top-[5%] lg:max-w-[15rem] lg:text-right",
  "lg:absolute lg:left-0 lg:top-[47%] lg:max-w-[14rem] lg:text-left",
  "lg:absolute lg:right-0 lg:top-[47%] lg:max-w-[14rem] lg:text-right",
  "lg:absolute lg:bottom-0 lg:left-1/2 lg:max-w-[17rem] lg:-translate-x-1/2 lg:text-center",
];

export default function Proof() {
  const p = content.proof;
  const surround = p.reviews.slice(0, 5);

  return (
    <section className="relative overflow-hidden border-t border-cream/10 bg-ink py-24 sm:py-32 lg:py-36">
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

        {/* The ovation — voices from the room around a spotlit center quote */}
        <div className="relative mt-16 sm:mt-20 lg:mt-24 lg:min-h-[640px]">
          {/* broad warm wash over the whole room */}
          <div
            className="pointer-events-none absolute -inset-x-6 -inset-y-12"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(60% 72% at 50% 50%, rgba(255,210,156,0.06) 0%, transparent 72%)",
            }}
          />
          {/* tighter stage spotlight on the featured quote */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[24rem] w-[42rem] max-w-full -translate-x-1/2 -translate-y-1/2"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(closest-side, rgba(255,210,156,0.12) 0%, transparent 70%)",
            }}
          />

          {/* The spotlight — featured review, center stage */}
          <Reveal
            as="figure"
            className="relative z-10 mx-auto mb-12 max-w-2xl text-center lg:absolute lg:left-1/2 lg:top-1/2 lg:mb-0 lg:w-[46%] lg:max-w-xl lg:-translate-x-1/2 lg:-translate-y-1/2"
          >
            <blockquote className="font-display text-2xl italic leading-snug text-cream [text-shadow:0_0_46px_rgba(255,210,156,0.3),0_2px_18px_rgba(0,0,0,0.6)] sm:text-3xl lg:text-[2rem]">
              &ldquo;{p.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-dim-cream">
              {p.author}
              <span className="mx-2 text-cream/30">·</span>
              <span className="text-[#d3ad77]">{p.city}</span>
            </figcaption>
          </Reveal>

          {/* The room — surrounding voices */}
          {surround.map((r, i) => (
            <Reveal
              as="figure"
              key={i}
              delay={150 + i * 90}
              className={`mx-auto mb-10 max-w-sm text-center last:mb-0 lg:mx-0 lg:mb-0 ${POS[i]}`}
            >
              <blockquote className="font-display text-base italic leading-relaxed text-cream/55 sm:text-lg lg:text-[0.95rem]">
                &ldquo;{r.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-3 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-cream/40">
                {r.author}
                <span className="mx-1.5 text-cream/25">·</span>
                {r.city}
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
