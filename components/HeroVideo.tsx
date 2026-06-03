"use client";

import { useEffect, useRef, useState } from "react";

interface HeroVideoProps {
  sources: string[];
  poster: string;
}

// Show each clip for at most this long before crossfading to the next.
const SEGMENT_SECONDS = 7;

/**
 * Crossfading background video playlist. Stacks each clip; the active one is
 * visible + playing. ~1.1s before its segment ends we advance to the next clip,
 * which fades in over the same window, so the clips dissolve into each other and
 * loop. Inactive clips are paused. Muted + playsInline so autoplay is allowed.
 */
export default function HeroVideo({ sources, poster }: HeroVideoProps) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLVideoElement | null)[]>([]);
  const advancing = useRef(false);

  useEffect(() => {
    advancing.current = false;
    refs.current.forEach((v, idx) => {
      if (!v) return;
      if (idx === active) {
        try {
          v.currentTime = 0;
        } catch {
          /* ignore */
        }
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  }, [active]);

  const advance = () => setActive((i) => (i + 1) % sources.length);

  const handleTimeUpdate =
    (i: number) => (e: React.SyntheticEvent<HTMLVideoElement>) => {
      if (i !== active || advancing.current) return;
      const v = e.currentTarget;
      const limit = Math.min(
        SEGMENT_SECONDS,
        (v.duration || SEGMENT_SECONDS) - 1.1
      );
      if (v.currentTime >= limit) {
        advancing.current = true;
        advance();
      }
    };

  return (
    <>
      {sources.map((src, i) => (
        <video
          key={src}
          ref={(el) => {
            refs.current[i] = el;
          }}
          autoPlay={i === 0}
          muted
          playsInline
          preload="auto"
          poster={poster}
          onTimeUpdate={handleTimeUpdate(i)}
          onEnded={() => {
            if (i === active) advance();
          }}
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1100ms] ease-in-out ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src={src} type="video/mp4" />
        </video>
      ))}
    </>
  );
}
