import { content } from "@/content";

export default function OccasionBar() {
  const o = content.occasion;

  return (
    <section id="occasion" className="border-y border-cream/10 bg-[#121110]">
      <div className="mx-auto flex max-w-shell flex-col items-center gap-4 px-6 py-5 sm:flex-row sm:justify-between sm:gap-6 sm:px-8">
        <p className="flex flex-col items-center gap-x-3 gap-y-1 text-center sm:flex-row sm:text-left">
          <span className="font-display text-base italic text-cream sm:text-lg">
            {o.lead}
          </span>
          <span className="hidden h-4 w-px bg-cream/20 sm:block" />
          <span className="text-sm text-dim-cream">{o.detail}</span>
        </p>
        <a
          href="#visit"
          className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-cream/25 px-5 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-cream transition-all duration-300 hover:bg-cream hover:text-ink"
        >
          {o.linkLabel}
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-0.5"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </div>
    </section>
  );
}
