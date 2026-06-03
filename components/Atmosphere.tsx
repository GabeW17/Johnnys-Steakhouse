import { content } from "@/content";
import Reveal from "./Reveal";

export default function Atmosphere() {
  const a = content.atmosphere;

  return (
    <section
      id="atmosphere"
      className="border-t border-cream/15 bg-espresso py-24 sm:py-32"
    >
      <div className="mx-auto grid max-w-shell items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <p className="eyebrow">{a.eyebrow}</p>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-cream sm:text-5xl">
            {a.heading}
          </h2>
          {a.paragraphs.map((p, i) => (
            <p key={i} className="mt-5 leading-relaxed text-dim-cream">
              {p}
            </p>
          ))}
          <a href="#visit" className="btn btn-primary mt-8">
            {a.cta}
          </a>
        </Reveal>

        <Reveal delay={120}>
          <div className="aspect-[4/5] overflow-hidden rounded-xl border border-cream/15">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={a.image}
              alt=""
              aria-hidden="true"
              className="h-full w-full object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
