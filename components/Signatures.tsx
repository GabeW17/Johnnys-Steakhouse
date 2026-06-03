import { content } from "@/content";
import Reveal from "./Reveal";

export default function Signatures() {
  const s = content.signatures;

  return (
    <section id="signatures" className="bg-ink py-24 sm:py-32">
      <div className="mx-auto max-w-shell px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">{s.eyebrow}</p>
          <h2 className="mt-4 font-display text-4xl font-semibold text-cream sm:text-5xl">
            {s.heading}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-dim-cream">{s.subtext}</p>
        </Reveal>

        <div className="mt-16 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {s.dishes.map((dish, i) => (
            <Reveal
              as="article"
              key={dish.name}
              delay={i * 120}
              className="group overflow-hidden rounded-xl border border-cream/15 bg-panel transition-all duration-500 hover:-translate-y-2 hover:border-cream/30"
            >
              <div className="aspect-[4/3] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-7">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-2xl font-semibold text-cream">
                    {dish.name}
                  </h3>
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
