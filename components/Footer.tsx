import { content } from "@/content";

export default function Footer() {
  const f = content.footer;

  return (
    <footer className="border-t border-cream/15 bg-ink pb-28 pt-14 md:pb-14">
      <div className="mx-auto flex max-w-shell flex-col items-center gap-3 px-5 text-center sm:px-8">
        <p className="font-display text-2xl font-semibold text-cream">
          {f.brand}
        </p>
        <p className="text-sm text-dim-cream">{f.tagline}</p>
      </div>
    </footer>
  );
}
