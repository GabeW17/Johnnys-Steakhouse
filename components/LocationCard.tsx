"use client";

import { useEffect } from "react";
import { content, type LocationItem } from "@/content";

export default function LocationCard({
  loc,
  onClose,
}: {
  loc: LocationItem;
  onClose: () => void;
}) {
  const l = content.locations;
  const hours = loc.hours ?? l.hours;
  const specials = loc.specials ?? l.specials;
  const directions = `https://www.google.com/maps/search/?api=1&query=${loc.lat},${loc.lng}`;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`${content.brand} — ${loc.city}`}
    >
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-cream/20 bg-[#161616] shadow-[0_50px_100px_-30px_rgba(0,0,0,1)]">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-ink/60 text-cream backdrop-blur transition-colors hover:bg-ink"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        {/* Storefront photo */}
        <div className="relative h-44 w-full overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={loc.image}
            alt={`${content.brand}, ${loc.city}`}
            className="h-full w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#161616] via-transparent to-black/20" />
        </div>

        <div className="p-6">
          <p className="eyebrow">{content.brand}</p>
          <h3 className="mt-1.5 font-display text-2xl font-semibold text-cream">
            {loc.city}, {loc.state}
          </h3>

          <div className="mt-5 space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="mt-0.5 shrink-0 text-dim-cream"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </svg>
              <span className="text-dim-cream">{hours}</span>
            </div>
            <div className="flex items-start gap-3">
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="mt-0.5 shrink-0 text-dim-cream"
              >
                <path d="M12 3l2.5 5.3 5.5.8-4 3.9.9 5.7L12 22l-4.9-2.6.9-5.7-4-3.9 5.5-.8z" />
              </svg>
              <span className="text-dim-cream">{specials}</span>
            </div>
          </div>

          <div className="mt-7 flex gap-3">
            <button type="button" className="btn btn-sm btn-primary flex-1">
              {l.reserveLabel}
            </button>
            <a
              href={directions}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-ghost flex-1"
            >
              {l.directionsLabel}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
