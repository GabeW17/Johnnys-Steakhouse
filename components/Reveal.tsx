"use client";

import {
  createElement,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

interface RevealProps {
  children: ReactNode;
  /** stagger delay in ms */
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "figure";
}

/**
 * Fades + rises its children into view once, when scrolled into the viewport.
 * Uses a single IntersectionObserver per instance and disconnects after firing.
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // createElement with a string tag avoids the "union type too complex"
  // error that a dynamic JSX <Tag> over all intrinsic elements produces.
  return createElement(
    as as string,
    {
      ref,
      className: `reveal ${visible ? "is-visible" : ""} ${className}`,
      style: { transitionDelay: `${delay}ms` },
    },
    children
  );
}
