"use client";

import { useEffect, useState } from "react";
import { content } from "@/content";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-cream/15 bg-ink/80 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[68px] max-w-shell items-center justify-between px-5 sm:px-8">
        {/* Links — left (chevrons are visual only) */}
        <nav className="hidden items-center gap-x-5 lg:flex xl:gap-x-7">
          {content.nav.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="inline-flex items-center gap-1 text-[0.8rem] font-medium uppercase tracking-[0.1em] text-cream/80 transition-colors hover:text-cream"
            >
              {link.label}
              {link.chevron && (
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="mt-px opacity-70"
                >
                  <path d="M4 6l4 4 4-4" />
                </svg>
              )}
            </a>
          ))}
        </nav>

        {/* Small logo — fades in only on scroll. The big logo lives in the hero
            (scrolls away with it), so nothing overlaps the page below. */}
        <a
          href="#top"
          aria-label={content.brand}
          className={`ml-auto flex items-center transition-opacity duration-300 ${
            scrolled ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          {content.brandLogo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={content.brandLogo}
              alt={content.brand}
              className="h-9 w-auto sm:h-10"
            />
          ) : (
            <span className="font-display text-2xl leading-none tracking-tight text-cream sm:text-3xl">
              {content.brandMark}
              <span className="align-super text-[0.45em] text-cream/55">©</span>
            </span>
          )}
        </a>
      </div>
    </header>
  );
}
