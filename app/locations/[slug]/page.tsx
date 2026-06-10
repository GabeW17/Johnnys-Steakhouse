import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import EditBridge from "@/components/EditBridge";
import Promos from "@/components/Promos";
import { getContent } from "@/lib/getContent";
import { slugify } from "@/lib/slug";
import { locationSchema } from "@/lib/schema";

export default async function LocationPage({
  params,
}: {
  params: { slug: string };
}) {
  const c = await getContent();
  const item = c.locations.items.find((i) => slugify(i.city) === params.slug);
  const lp = c.locationPages?.[params.slug];
  if (!item || !lp) notFound();

  const path = (k: string) => `locationPages.${params.slug}.${k}`;
  const directions = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    "Johnny's Italian Steakhouse " + item.city + " " + item.state
  )}`;

  return (
    <>
      {/* Structured data — embedded once the Audit's "Structured data" fix is applied */}
      {c.seo?.schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(locationSchema(c, item, lp)) }}
        />
      )}
      <EditBridge />
      <Nav />
      <main>
        {/* Hero */}
        <section className="relative flex min-h-[68vh] items-end overflow-hidden pt-[68px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.image} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(7,5,4,0.96) 0%, rgba(7,5,4,0.35) 55%, rgba(7,5,4,0.6) 100%)",
            }}
          />
          <div className="relative mx-auto w-full max-w-shell px-6 pb-14 sm:px-8">
            <p className="eyebrow">Johnny&apos;s Italian Steakhouse</p>
            <h1 className="mt-3 font-sans text-5xl font-bold uppercase leading-[0.98] tracking-tight text-cream [text-shadow:0_2px_24px_rgba(0,0,0,0.8)] sm:text-6xl lg:text-7xl">
              {item.city}, {item.state}
            </h1>
            <p
              data-edit={path("tagline")}
              className="mt-5 max-w-xl font-display text-lg italic leading-snug text-cream/85 sm:text-xl"
            >
              {lp.tagline}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#"
                className="inline-flex items-center justify-center rounded-lg bg-gradient-to-b from-white to-cream px-7 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-ink shadow-[0_14px_30px_-8px_rgba(0,0,0,0.72),inset_0_1px_0_rgba(255,255,255,0.9)] transition-all duration-300 hover:-translate-y-1"
              >
                Reserve a table
              </a>
              <a
                href={directions}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg border border-cream/60 bg-ink/25 px-7 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-cream backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-cream hover:text-ink"
              >
                Get directions
              </a>
            </div>
          </div>
        </section>

        <Promos promos={c.promotions} target={params.slug} />

        {/* Details */}
        <section className="border-t border-cream/10 bg-ink py-16 sm:py-20">
          <div className="mx-auto grid max-w-shell gap-10 px-6 sm:px-8 md:grid-cols-3">
            <div>
              <p className="eyebrow">Hours</p>
              <p data-edit={path("hours")} className="mt-4 text-lg leading-relaxed text-cream">
                {lp.hours}
              </p>
            </div>

            <div>
              <p className="eyebrow">Find us</p>
              <p data-edit={path("address")} className="mt-4 leading-relaxed text-dim-cream">
                {lp.address}
              </p>
              <p data-edit={path("phone")} className="mt-1 text-cream">
                {lp.phone}
              </p>
              <a
                href={directions}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-cream/85 transition-colors hover:text-cream"
              >
                Get directions →
              </a>
            </div>

            <div>
              <p className="eyebrow">This week</p>
              <p data-edit={path("specials")} className="mt-4 text-lg leading-relaxed text-cream">
                {lp.specials}
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
