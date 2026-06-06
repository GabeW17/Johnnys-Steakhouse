import { content, type SiteContent } from "@/content";

export default function Banner({ data }: { data?: SiteContent["banner"] }) {
  const b = data ?? content.banner;
  if (!b.enabled) return null;

  return (
    <section className="relative overflow-hidden border-b border-cream/12">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={b.image}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(8,6,4,0.95) 0%, rgba(8,6,4,0.82) 42%, rgba(8,6,4,0.5) 100%)",
        }}
      />
      <div className="relative mx-auto flex max-w-shell flex-col items-start gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <p
            className="text-[0.62rem] font-semibold uppercase tracking-[0.24em]"
            style={{ color: "rgba(255,210,156,0.92)" }}
          >
            Featured this week
          </p>
          <p className="mt-1.5 font-display text-xl font-semibold leading-tight text-cream sm:text-2xl">
            {b.message}
          </p>
        </div>
        <a
          href={b.buttonHref}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-gradient-to-b from-white to-cream px-6 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-ink shadow-[0_14px_30px_-8px_rgba(0,0,0,0.72),inset_0_1px_0_rgba(255,255,255,0.9)] transition-all duration-300 hover:-translate-y-0.5"
        >
          {b.buttonLabel}
        </a>
      </div>
    </section>
  );
}
