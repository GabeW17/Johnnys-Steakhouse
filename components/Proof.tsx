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
    <section className="relative overflow-hidden border-t border-cream/10 bg-ink py-20 sm:py-24 lg:py-28">
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
        <div className="relative mt-12 sm:mt-14 lg:mt-14 lg:min-h-[520px]">
          {/* broad warm wash over the whole room */}
          <div
            className="pointer-events-none absolute -inset-x-6 -inset-y-12"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(60% 72% at 50% 50%, rgba(255,210,156,0.06) 0%, transparent 72%)",
            }}
          />
          {/* Stage spotlights — two warm beams from above converging on the
              featured quote, plus a soft footlight pool lighting it. */}
          <div
            className="pointer-events-none absolute inset-0 mix-blend-screen"
            aria-hidden="true"
            style={{
              background:
                "conic-gradient(from 0deg at 36% -30%, transparent 152deg, rgba(255,210,156,0.17) 167deg, rgba(255,210,156,0.17) 173deg, transparent 188deg)," +
                "conic-gradient(from 0deg at 64% -30%, transparent 172deg, rgba(255,210,156,0.17) 187deg, rgba(255,210,156,0.17) 193deg, transparent 208deg)," +
                "radial-gradient(32% 40% at 50% 54%, rgba(255,210,156,0.13) 0%, transparent 72%)",
              maskImage:
                "linear-gradient(to bottom, #000 0%, #000 68%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, #000 0%, #000 68%, transparent 100%)",
            }}
          />

          {/* The spotlight — featured review, center stage.
              Positioning (incl. the -translate centering) lives on this plain
              wrapper; Reveal is INSIDE so its transform animation can't clobber
              the centering transform. */}
          <div className="relative z-10 mx-auto mb-10 max-w-2xl text-center lg:absolute lg:left-1/2 lg:top-1/2 lg:mb-0 lg:w-[46%] lg:max-w-xl lg:-translate-x-1/2 lg:-translate-y-1/2">
            <Reveal as="figure">
              <blockquote className="font-display text-2xl italic leading-snug text-cream [text-shadow:0_2px_18px_rgba(0,0,0,0.7)] sm:text-3xl lg:text-[2rem]">
                &ldquo;{p.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-dim-cream">
                {p.author}
                <span className="mx-2 text-cream/30">·</span>
                <span className="text-[#d3ad77]">{p.city}</span>
              </figcaption>
            </Reveal>
          </div>

          {/* The room — surrounding voices (wrapper positions, Reveal animates) */}
          {surround.map((r, i) => (
            <div
              key={i}
              className={`mx-auto mb-8 max-w-sm text-center last:mb-0 lg:mx-0 lg:mb-0 ${POS[i]}`}
            >
              <Reveal as="figure" delay={150 + i * 90}>
                <blockquote className="font-display text-base italic leading-relaxed text-cream/55 sm:text-lg lg:text-[0.95rem]">
                  &ldquo;{r.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-3 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-cream/40">
                  {r.author}
                  <span className="mx-1.5 text-cream/25">·</span>
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
