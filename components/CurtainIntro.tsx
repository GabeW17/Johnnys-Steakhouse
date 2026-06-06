"use client";

import { useEffect, useState } from "react";

/**
 * Theatre-curtain intro. Two velvet panels cover the viewport on load, hold
 * briefly while the page's images/fonts finish loading, then sweep apart from
 * the middle to reveal the hero — then unmount. Falls back on a timer so it
 * never hangs, and is skipped entirely for reduced-motion users.
 */
export default function CurtainIntro() {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);

  // Decide when to open: once everything has loaded (or a safety timeout).
  useEffect(() => {
    // Skip the curtain inside the CMS editor (loaded with ?edit=1).
    if (new URLSearchParams(window.location.search).get("edit") === "1") {
      setDone(true);
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(true);
      return;
    }

    let fired = false;
    const trigger = () => {
      if (fired) return;
      fired = true;
      window.setTimeout(() => setOpen(true), 450); // brief hold, then part
    };

    if (document.readyState === "complete") trigger();
    else window.addEventListener("load", trigger, { once: true });
    const fallback = window.setTimeout(trigger, 3200); // never hang

    return () => {
      window.removeEventListener("load", trigger);
      window.clearTimeout(fallback);
    };
  }, []);

  // Remove from the tree after the parting animation finishes.
  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => setDone(true), 1700);
    return () => window.clearTimeout(t);
  }, [open]);

  if (done) return null;

  // Crisp velvet: defined ridges + valleys with a thin sheen line per pleat,
  // over a top-to-bottom depth gradient.
  const velvet =
    "linear-gradient(180deg, rgba(255,245,235,0.06) 0%, rgba(0,0,0,0.12) 32%, rgba(0,0,0,0.62) 100%), " +
    "repeating-linear-gradient(90deg, #150b08 0px, #2b1611 14px, #47281f 28px, #5e362a 30px, #47281f 32px, #2b1611 46px, #150b08 60px)";

  const panel =
    "h-full w-1/2 transition-transform duration-[1400ms] ease-[cubic-bezier(0.78,0,0.22,1)] will-change-transform";

  return (
    <div
      className={`absolute inset-0 z-30 flex overflow-hidden ${
        open ? "pointer-events-none" : ""
      }`}
      aria-hidden="true"
    >
      {/* Left panel */}
      <div
        className={panel}
        style={{
          background: velvet,
          boxShadow:
            "inset -16px 0 36px rgba(0,0,0,0.6), inset -1px 0 0 rgba(245,239,230,0.18)",
          transform: open ? "translateX(-100%)" : "translateX(0)",
        }}
      />
      {/* Right panel */}
      <div
        className={panel}
        style={{
          background: velvet,
          boxShadow:
            "inset 16px 0 36px rgba(0,0,0,0.6), inset 1px 0 0 rgba(245,239,230,0.18)",
          transform: open ? "translateX(100%)" : "translateX(0)",
        }}
      />
    </div>
  );
}
