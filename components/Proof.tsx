import { content } from "@/content";
import Reveal from "./Reveal";

export default function Proof() {
  const p = content.proof;
  const supporting = p.reviews.slice(0, 3);

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

        {/* The spotlight — featured review, lit from above like a performer */}
        <div className="relative mt-10 sm:mt-12">
          {/* a single soft spotlight from above + a gentle pool where it lands */}
          <div
            className="pointer-events-none absolute inset-x-0 -top-16 bottom-0 mix-blend-screen"
            aria-hidden="true"
            style={{
              background:
                "conic-gradient(from 0deg at 50% -75%, transparent 162deg, rgba(255,210,156,0.09) 174deg, rgba(255,210,156,0.09) 186deg, transparent 198deg)," +
                "radial-gradient(40% 50% at 50% 50%, rgba(255,210,156,0.13) 0%, transparent 72%)",
              maskImage:
                "linear-gradient(to bottom, transparent 0%, #000 22%, #000 76%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent 0%, #000 22%, #000 76%, transparent 100%)",
            }}
          />
          <Reveal
            as="figure"
            className="relative z-10 mx-auto max-w-2xl px-2 py-4 text-center sm:py-6"
          >
            <span
              aria-hidden="true"
              className="block font-display text-6xl leading-[0.5] text-[#d3ad77]/35 sm:text-7xl"
            >
              &ldquo;
            </span>
            <blockquote className="mt-3 font-display text-2xl italic leading-snug text-cream [text-shadow:0_2px_18px_rgba(0,0,0,0.7)] sm:text-3xl lg:text-[2rem]">
              {p.quote}
            </blockquote>
            <figcaption className="mt-6 flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-dim-cream">
              <span className="h-px w-5 bg-cream/25" />
              {p.author}
              <span className="text-cream/30">·</span>
              <span className="text-[#d3ad77]">{p.city}</span>
              <span className="h-px w-5 bg-cream/25" />
            </figcaption>
          </Reveal>
        </div>

        {/* The room — supporting voices, a clean editorial row */}
        <div className="relative mt-10 grid gap-x-10 gap-y-10 sm:mt-12 sm:grid-cols-3">
          {supporting.map((r, i) => (
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
