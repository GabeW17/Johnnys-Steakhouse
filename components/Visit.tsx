import { content } from "@/content";
import Reveal from "./Reveal";

export default function Visit() {
  const v = content.visit;

  return (
    <section
      id="visit"
      className="border-t border-cream/15 bg-espresso py-24 sm:py-32"
    >
      <div className="mx-auto grid max-w-shell items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <p className="eyebrow">{v.eyebrow}</p>
          <h2 className="mt-4 font-display text-4xl font-semibold text-cream sm:text-5xl">
            {v.heading}
          </h2>
          <p className="mt-5 max-w-md leading-relaxed text-dim-cream">
            {v.body}
          </p>
          <a href={v.ctaHref} className="btn btn-primary mt-8">
            {v.cta}
          </a>
        </Reveal>

        <Reveal delay={120}>
          <div className="rounded-2xl border border-cream/15 bg-panel p-8 sm:p-10">
            <h3 className="font-display text-2xl text-cream">{v.cardTitle}</h3>
            <ul className="mt-6 divide-y divide-cream/15">
              {v.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-3 py-3.5 text-cream"
                >
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 shrink-0 rotate-45 bg-cream/50"
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
