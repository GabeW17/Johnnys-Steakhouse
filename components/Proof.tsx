import { content } from "@/content";
import Reveal from "./Reveal";

export default function Proof() {
  const p = content.proof;

  return (
    <section className="border-t border-cream/15 bg-oxblood py-24 sm:py-32">
      <Reveal className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <blockquote className="font-display text-3xl font-medium italic leading-snug text-cream sm:text-4xl">
          &ldquo;{p.quote}&rdquo;
        </blockquote>
        <p className="mt-7 text-sm tracking-wide text-dim-cream">{p.stat}</p>
      </Reveal>
    </section>
  );
}
