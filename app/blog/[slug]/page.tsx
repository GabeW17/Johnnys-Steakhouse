import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { getContent } from "@/lib/getContent";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const c = await getContent();
  const post = (c.blog ?? []).find((p) => p.slug === params.slug);
  if (!post) return { title: "Journal" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      images: post.image ? [post.image] : undefined,
    },
  };
}

// Render the article body: blocks split by blank lines. A short first line in a
// block becomes a subheading; "•" lines become a list; everything else is prose.
function Article({ body }: { body: string }) {
  const blocks = body.split("\n\n").map((b) => b.trim()).filter(Boolean);
  return (
    <div className="space-y-6">
      {blocks.map((block, i) => {
        const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
        if (lines.every((l) => l.startsWith("•"))) {
          return (
            <ul key={i} className="space-y-2 pl-1">
              {lines.map((l, j) => (
                <li key={j} className="flex gap-3 text-[1.02rem] leading-relaxed text-cream/85">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  <span>{l.replace(/^•\s*/, "")}</span>
                </li>
              ))}
            </ul>
          );
        }
        const head = lines[0];
        const isHeading = lines.length > 1 && head.length < 64 && !/[.!?:]$/.test(head);
        if (isHeading) {
          return (
            <div key={i}>
              <h2 className="font-sans text-2xl font-bold uppercase tracking-tight text-cream">{head}</h2>
              <p className="mt-2 text-[1.02rem] leading-relaxed text-cream/85">{lines.slice(1).join(" ")}</p>
            </div>
          );
        }
        return (
          <p key={i} className="text-[1.02rem] leading-relaxed text-cream/85">{lines.join(" ")}</p>
        );
      })}
    </div>
  );
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const c = await getContent();
  const post = (c.blog ?? []).find((p) => p.slug === params.slug);
  if (!post) notFound();
  const more = (c.blog ?? []).filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <Nav />
      <main>
        {/* Hero */}
        <section className="relative flex min-h-[56vh] items-end overflow-hidden pt-[68px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.image || "/photos/hero-steak.jpg"} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(7,5,4,0.96) 0%, rgba(7,5,4,0.4) 55%, rgba(7,5,4,0.6) 100%)" }}
          />
          <div className="relative mx-auto w-full max-w-shell px-6 pb-12 sm:px-8">
            <Link href="/blog" className="eyebrow inline-flex items-center gap-1.5 text-cream/70 transition-colors hover:text-cream">
              ← The Journal
            </Link>
            {post.tag && <p className="eyebrow mt-4 text-gold">{post.tag}</p>}
            <h1 className="mt-2 max-w-3xl font-sans text-4xl font-bold uppercase leading-[1.0] tracking-tight text-cream [text-shadow:0_2px_24px_rgba(0,0,0,0.8)] sm:text-5xl lg:text-6xl">
              {post.title}
            </h1>
            <p className="mt-5 text-[0.76rem] uppercase tracking-[0.18em] text-cream/65">
              {post.author} · {post.date}
            </p>
          </div>
        </section>

        {/* Body */}
        <article className="mx-auto max-w-2xl px-6 py-14 sm:px-8">
          <p className="mb-8 border-l-2 border-gold/60 pl-4 font-display text-xl italic leading-snug text-cream/80">
            {post.excerpt}
          </p>
          <Article body={post.body} />

          {/* CTA */}
          <div className="mt-12 rounded-2xl border border-cream/15 bg-white/[0.03] p-7 text-center">
            <p className="font-sans text-2xl font-bold uppercase tracking-tight text-cream">Pull up a chair</p>
            <p className="mx-auto mt-2 max-w-md text-[0.95rem] leading-relaxed text-cream/75">
              Reserve your table at the nearest Johnny&apos;s Italian Steakhouse — we&apos;ll take care of the rest.
            </p>
            <Link
              href="/#locations"
              className="mt-5 inline-flex items-center justify-center rounded-lg bg-gradient-to-b from-white to-cream px-7 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-ink shadow-[0_14px_30px_-8px_rgba(0,0,0,0.6)] transition-all duration-300 hover:-translate-y-0.5"
            >
              Find your Johnny&apos;s
            </Link>
          </div>
        </article>

        {/* More posts */}
        {more.length > 0 && (
          <section className="mx-auto max-w-shell px-6 pb-24 sm:px-8">
            <p className="eyebrow mb-4">More from the Journal</p>
            <div className="grid gap-6 sm:grid-cols-2">
              {more.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group flex items-center gap-4 overflow-hidden rounded-xl border border-cream/15 bg-white/[0.02] p-3 transition-colors hover:border-cream/30"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.image || "/photos/hero-steak.jpg"} alt="" className="h-20 w-28 shrink-0 rounded-lg object-cover" />
                  <div className="min-w-0">
                    {p.tag && <span className="eyebrow text-gold">{p.tag}</span>}
                    <h3 className="mt-1 font-sans text-base font-bold uppercase leading-tight tracking-tight text-cream">{p.title}</h3>
                    <p className="mt-1 text-[0.72rem] uppercase tracking-[0.14em] text-cream/50">{p.date}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
