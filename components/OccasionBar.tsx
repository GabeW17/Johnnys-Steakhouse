import { content } from "@/content";

export default function OccasionBar() {
  const o = content.occasion;

  return (
    <section id="occasion" className="border-y border-cream/15 bg-oxblood">
      <div className="mx-auto flex max-w-shell flex-col items-start gap-2 px-5 py-4 text-sm sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-8">
        <p>
          <span className="font-semibold text-cream">{o.lead}</span>{" "}
          <span className="text-dim-cream">{o.detail}</span>
        </p>
        <a
          href="#visit"
          className="shrink-0 whitespace-nowrap font-medium text-cream underline-offset-4 hover:underline"
        >
          {o.linkLabel} →
        </a>
      </div>
    </section>
  );
}
