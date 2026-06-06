import { content, type SiteContent } from "@/content";

function RealBanner({ b }: { b: SiteContent["banner"] }) {
  return (
    <section className="jis-banner-real relative overflow-hidden border-b border-cream/12">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img data-img="banner.image" src={b.image} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(8,6,4,0.95) 0%, rgba(8,6,4,0.82) 45%, rgba(8,6,4,0.5) 100%)",
        }}
      />

      {/* in-site edit controls (edit mode only) */}
      <div className="jis-banner-ctls absolute right-3 top-3 z-10 items-center gap-2">
        <button
          type="button"
          data-edit-img="banner.image"
          className="rounded-md border border-cream/30 bg-ink/60 px-3 py-1.5 text-[0.64rem] font-semibold uppercase tracking-wide text-cream/90 backdrop-blur transition-colors hover:border-cream/60"
        >
          Change photo
        </button>
        <button
          type="button"
          data-banner-remove
          aria-label="Remove banner"
          className="grid h-8 w-8 place-items-center rounded-full border border-cream/30 bg-ink/60 text-cream/90 backdrop-blur transition-colors hover:border-bad/70 hover:text-bad"
        >
          ✕
        </button>
      </div>

      <div className="relative mx-auto flex max-w-shell flex-col items-start gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <p
            className="text-[0.62rem] font-semibold uppercase tracking-[0.24em]"
            style={{ color: "rgba(255,210,156,0.92)" }}
          >
            Featured this week
          </p>
          <p data-edit="banner.message" className="mt-1.5 font-display text-xl font-semibold leading-tight text-cream sm:text-2xl">
            {b.message}
          </p>
        </div>
        <a
          href={b.buttonHref}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-gradient-to-b from-white to-cream px-6 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-ink shadow-[0_14px_30px_-8px_rgba(0,0,0,0.72),inset_0_1px_0_rgba(255,255,255,0.9)] transition-all duration-300 hover:-translate-y-0.5"
        >
          <span data-edit="banner.buttonLabel">{b.buttonLabel}</span>
        </a>
      </div>
    </section>
  );
}

function AddPlaceholder() {
  return (
    <button
      type="button"
      data-banner-add
      className="jis-banner-add w-full items-center justify-center gap-2 border-b border-dashed border-[rgba(255,210,156,0.4)] bg-[rgba(255,210,156,0.06)] py-5 text-sm font-semibold text-[rgba(255,210,156,0.92)] transition-colors hover:bg-[rgba(255,210,156,0.12)]"
    >
      <span className="grid h-6 w-6 place-items-center rounded-full border border-[rgba(255,210,156,0.6)] text-lg leading-none">+</span>
      Add a promotional banner
    </button>
  );
}

export default function Banner({
  data,
  editing = false,
}: {
  data?: SiteContent["banner"];
  editing?: boolean;
}) {
  const b = data ?? content.banner;

  // Public site: show the banner only when enabled.
  if (!editing) {
    return b.enabled ? <RealBanner b={b} /> : null;
  }

  // Editor: render both; CSS shows the banner (+ ✕) or the + placeholder
  // based on data-enabled, which the edit bridge flips instantly on click.
  return (
    <div className="jis-banner-slot" data-enabled={b.enabled ? "true" : "false"}>
      <RealBanner b={b} />
      <AddPlaceholder />
    </div>
  );
}
