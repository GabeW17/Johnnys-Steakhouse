"use client";

import { useState } from "react";
import { content } from "@/content";
import Reveal from "./Reveal";
import SocialIcon from "./SocialIcon";

export default function Connect() {
  const c = content.connect;
  const socials = content.footer.social;
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="relative overflow-hidden border-t border-cream/10 bg-ink py-16 sm:py-20">
      {/* faint warm glow along the top */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-48"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(50% 100% at 50% 0%, rgba(255,210,156,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-shell px-6 sm:px-8">
        <Reveal className="grid gap-12 lg:grid-cols-[1.45fr_1fr] lg:items-center lg:gap-16">
          {/* Newsletter */}
          <div>
            <p className="eyebrow">{c.eyebrow}</p>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-cream sm:text-4xl">
              {c.heading}
            </h2>
            <p className="mt-4 max-w-md leading-relaxed text-dim-cream">
              {c.copy}
            </p>

            {submitted ? (
              <p className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-cream">
                <span aria-hidden="true" className="text-[#d3ad77]">
                  ✓
                </span>
                {c.success}
              </p>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="mt-7 flex max-w-md flex-col gap-3 sm:flex-row"
              >
                <input
                  type="email"
                  required
                  placeholder={c.placeholder}
                  aria-label="Email address"
                  className="min-w-0 flex-1 rounded-lg border border-cream/20 bg-cream/[0.04] px-4 py-3 text-sm text-cream transition-colors placeholder:text-dim-cream/70 focus:border-cream/45 focus:bg-cream/[0.06]"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-lg bg-gradient-to-b from-white to-cream px-6 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-ink shadow-[0_12px_26px_-10px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_34px_-10px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.95)]"
                >
                  {c.button}
                </button>
              </form>
            )}
          </div>

          {/* Socials */}
          <div className="lg:border-l lg:border-cream/10 lg:pl-16">
            <p className="eyebrow">{c.socialEyebrow}</p>
            <p className="mt-4 font-display text-2xl font-semibold text-cream">
              {c.handle}
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/20 text-cream/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-cream/45 hover:bg-cream/[0.06] hover:text-cream"
                >
                  <SocialIcon name={s.icon} />
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
