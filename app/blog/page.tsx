import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { getContent } from "@/lib/getContent";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Journal — Stories, Guides & Supper-Club Notes",
  description:
    "Dining guides, private-event tips and supper-club stories from Johnny's Italian Steakhouse.",
  alternates: { canonical: "/blog" },
};

export default async function BlogIndex() {
  const c = await getContent();
  const posts = c.blog ?? [];
  const [featured, ...rest] = posts;

  return (
    <>
      <Nav />
      <main className="pt-[68px]">
        {/* Header */}
        <section className="mx-auto max-w-shell px-6 pb-10 pt-16 sm:px-8">
          <p className="eyebrow">The Johnny&apos;s Journal</p>
          <h1 className="mt-3 font-sans text-5xl font-bold uppercase leading-[0.98] tracking-tight text-cream sm:text-6xl">
            Stories from the supper club
          </h1>
          <p className="mt-5 max-w-xl font-display text-lg italic leading-snug text-cream/70 sm:text-xl">
            Dining guides, private-event ideas and notes from the kitchen.
          </p>
        </section>

        {posts.length === 0 ? (
          <section className="mx-auto max-w-shell px-6 pb-24 sm:px-8">
            <p className="text-cream/60">No posts yet — check back soon.</p>
          </section>
        ) : (
          <section className="mx-auto max-w-shell px-6 pb-24 sm:px-8">
            {/* Featured */}
            <Link
              href={`/blog/${featured.slug}`}
              className="group relative block overflow-hidden rounded-2xl border border-cream/15"
            >
              <div className="relative aspect-[16/7] w-full overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={featured.image || "/photos/hero-steak.jpg"}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(7,5,4,0.95) 0%, rgba(7,5,4,0.25) 60%, rgba(7,5,4,0.45) 100%)" }}
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                {featured.tag && <span className="eyebrow text-gold">{featured.tag}</span>}
                <h2 className="mt-2 max-w-3xl font-sans text-3xl font-bold uppercase leading-[1.02] tracking-tight text-cream [text-shadow:0_2px_18px_rgba(0,0,0,0.7)] sm:text-4xl">
                  {featured.title}
                </h2>
                <p className="mt-3 max-w-2xl text-[0.95rem] leading-relaxed text-cream/80">{featured.excerpt}</p>
                <p className="mt-3 text-[0.74rem] uppercase tracking-[0.16em] text-cream/55">
                  {featured.author} · {featured.date}
                </p>
              </div>
            </Link>

            {/* Rest */}
            {rest.length > 0 && (
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/blog/${p.slug}`}
                    className="group flex flex-col overflow-hidden rounded-xl border border-cream/15 bg-white/[0.02] transition-colors hover:border-cream/30"
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.image || "/photos/hero-steak.jpg"}
                        alt=""
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      {p.tag && <span className="eyebrow text-gold">{p.tag}</span>}
                      <h3 className="mt-1.5 font-sans text-xl font-bold uppercase leading-tight tracking-tight text-cream">
                        {p.title}
                      </h3>
                      <p className="mt-2 flex-1 text-[0.86rem] leading-relaxed text-cream/70">{p.excerpt}</p>
                      <p className="mt-4 text-[0.72rem] uppercase tracking-[0.16em] text-cream/50">{p.date}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
