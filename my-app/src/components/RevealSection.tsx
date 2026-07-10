"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import type { RevealSectionProps } from "@/types/RevealSectionProps";

export default function RevealSection({
  children,
  className = "",
  lazy = false,
  slideFrom = "bottom",
}: RevealSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(!lazy);

  const hiddenClass = {
    left: "-translate-x-12 translate-y-4",
    right: "translate-x-12 translate-y-4",
    bottom: "translate-y-12",
  }[slideFrom];

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);

        if (entry.isIntersecting) {
          setHasLoaded(true);
        }
      },
      { rootMargin: "160px 0px", threshold: 0.14 },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  const sectionStyle: CSSProperties = {
    contentVisibility: "auto",
    containIntrinsicSize: "1px 520px",
  };

  return (
    <section
      ref={ref}
      className={`mx-auto w-full max-w-6xl transform-gpu px-4 py-12 text-center transition-all duration-700 ease-out will-change-transform sm:px-6 lg:px-8 motion-reduce:transform-none motion-reduce:opacity-100 ${
        isVisible
          ? "translate-x-0 translate-y-0 opacity-100"
          : `${hiddenClass} opacity-0`
      } ${className}`}
      style={sectionStyle}
    >
      {hasLoaded && children}
    </section>
  );
}
