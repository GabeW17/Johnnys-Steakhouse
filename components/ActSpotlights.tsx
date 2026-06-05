"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The three overhead "stage" spotlights for the three-act title.
 * They switch ON one at a time, left → right, when the section scrolls
 * into view — like a lighting board bringing each act up.
 */
const BEAMS = [
  // THE PLAY — left
  "conic-gradient(from 0deg at 22% -16%, transparent 154deg, rgba(255,210,156,0.12) 167deg, rgba(255,210,156,0.12) 186deg, transparent 199deg)," +
    "radial-gradient(34% 64% at 22% 34%, rgba(255,210,156,0.06) 0%, transparent 72%)",
  // THE PRODUCTION — center
  "conic-gradient(from 0deg at 50% -16%, transparent 160deg, rgba(255,210,156,0.12) 172deg, rgba(255,210,156,0.12) 190deg, transparent 202deg)," +
    "radial-gradient(34% 64% at 50% 34%, rgba(255,210,156,0.06) 0%, transparent 72%)",
  // THE PERFORMANCE — right
  "conic-gradient(from 0deg at 78% -16%, transparent 161deg, rgba(255,210,156,0.12) 174deg, rgba(255,210,156,0.12) 193deg, transparent 206deg)," +
    "radial-gradient(34% 64% at 78% 34%, rgba(255,210,156,0.06) 0%, transparent 72%)",
];

const MASK = "linear-gradient(to bottom, #000 0%, #000 48%, transparent 92%)";

export default function ActSpotlights() {
  const ref = useRef<HTMLDivElement>(null);
  const [lit, setLit] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Reduced motion: just have them on, no sequence.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLit(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLit(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-x-0 top-0 h-[42rem]"
      aria-hidden="true"
    >
      {BEAMS.map((bg, i) => (
        <div
          key={i}
          className="absolute inset-0 mix-blend-screen transition-opacity duration-[800ms] ease-out motion-reduce:transition-none"
          style={{
            background: bg,
            maskImage: MASK,
            WebkitMaskImage: MASK,
            opacity: lit ? 1 : 0,
            transitionDelay: lit ? `${i * 280}ms` : "0ms",
          }}
        />
      ))}
    </div>
  );
}
