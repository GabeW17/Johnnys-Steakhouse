import { content } from "@/content";
import Reveal from "./Reveal";

export default function Statement() {
  const s = content.manifesto;

  return (
    <section className="border-t border-cream/10 bg-ink py-24 sm:py-32 lg:py-40">
      <Reveal className="mx-auto max-w-shell px-6 text-center sm:px-8">
        <p className="eyebrow">{s.eyebrow}</p>
        <h2 className="mt-6 font-sans text-3xl font-extrabold uppercase leading-[0.96] tracking-tight text-cream sm:text-6xl lg:text-[5rem]">
          {s.lines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>
        <p className="mx-auto mt-9 max-w-2xl text-base leading-relaxed text-dim-cream sm:text-lg">
          {s.body}
        </p>
      </Reveal>
    </section>
  );
}
