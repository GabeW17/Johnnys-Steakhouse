import { content } from "@/content";
import Reveal from "./Reveal";

function Stars({ size = "h-4" }: { size?: string }) {
  return (
    <div className="flex items-center gap-0.5" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`${size} w-auto`}
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  );
}

export default function Proof() {
  const p = content.proof;

  return (
    <section className="relative overflow-hidden border-t border-cream/10 bg-ink py-24 sm:py-32 lg:py-36">
      {/* warm theatrical glow */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-80"
        style={{
          background:
            "radial-gradient(55% 100% at 50% 0%, rgba(255,210,156,0.11) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-shell px-6 sm:px-8">
        <Reveal className="mx-auto max-w-4xl text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-cream/25" />
            <p className="eyebrow">{p.eyebrow}</p>
            <span className="h-px w-8 bg-cream/25" />
          </div>

          {/* aggregate rating */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <span className="text-[#e6c178]">
              <Stars size="h-5" />
            </span>
            <span className="font-display text-2xl leading-none text-cream">
              {p.rating}
            </span>
            <span className="text-sm text-dim-cream">from {p.count}</span>
          </div>

          {/* hero pull-quote */}
          <div className="relative mt-10">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 select-none font-display text-[13rem] leading-none text-cream/[0.06]"
            >
              &ldquo;
            </span>
            <blockquote className="relative font-display text-3xl font-medium italic leading-[1.18] text-cream sm:text-4xl lg:text-[2.9rem]">
              {p.quote}
            </blockquote>
            <p className="mt-8 text-[0.7rem] uppercase tracking-[0.22em] text-dim-cream">
              {p.author}
            </p>
          </div>
        </Reveal>

      </div>

      {/* supporting reviews — a slow, edge-faded marquee (pauses on hover) */}
      <div className="marquee-mask group relative mt-16 sm:mt-20">
        <div className="animate-marquee flex w-max gap-5 group-hover:[animation-play-state:paused]">
          {[...p.reviews, ...p.reviews].map((r, i) => (
            <figure
              key={i}
              className="w-[330px] shrink-0 rounded-2xl border border-cream/10 bg-[#141312] p-6 text-left"
            >
              <span className="text-[#e6c178]">
                <Stars size="h-3.5" />
              </span>
              <blockquote className="mt-3.5 font-display text-base italic leading-relaxed text-cream/90">
                &ldquo;{r.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-4 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-dim-cream">
                {r.author}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
