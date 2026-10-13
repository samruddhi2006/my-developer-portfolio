"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { usePerfProfile } from "@/hooks/use-perf-profile";
import { useTheme } from "next-themes";

// Pan speed (CSS px/sec). Higher value = faster scroll.
const PAN_SPEED = 120;

// A page only pans if it overflows the frame by at least this fraction of the
// frame height. Anything shorter (landscape/square screenshots) is shown
// "cover" instead, so any image looks right with no per-image config.
const MIN_SCROLL_OVERFLOW = 0.2;

// Theme-aware wallpaper fallbacks: ice-blue tile in light (matches the
// Linear-style theme), slate tile in dark. Resolved client-side only, so the
// server and first client render always agree (dark default).
const FALLBACK_BG_DARK = "linear-gradient(135deg, #1e293b, #0f172a)";
const FALLBACK_BG_LIGHT = "linear-gradient(135deg, #e3ecfd, #f6f9fe)";
const FALLBACK_BASE_DARK = "#0f172a";
const FALLBACK_BASE_LIGHT = "#edf2f9";

/**
 * Card preview: a screenshot floating over a wallpaper. Tall landing pages pan
 * on hover and smoothly return to top on mouse leave; normal (landscape/square)
 * screenshots are shown "cover", centered.
 *
 * No fabricated visuals: until the real screenshot file exists the component
 * renders nothing, so the card gracefully collapses to title + category.
 */
const ScrollingPreview = ({
  src,
  alt,
  bg,
  isHovered = false,
}: {
  src: string;
  alt: string;
  bg?: string;
  isHovered?: boolean;
}) => {
  const { reducedMotion: reduceMotion } = usePerfProfile();
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";
  const viewportRef = useRef<HTMLDivElement>(null);
  const [scrollPx, setScrollPx] = useState(0);
  const [bgReady, setBgReady] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [dims, setDims] = useState<{ w: number; h: number } | null>(null);

  // Probe the screenshot file. Nothing renders until it loads.
  useEffect(() => {
    let cancelled = false;
    setLoaded(false);
    setDims(null);
    const img = new window.Image();
    img.onload = () => {
      if (cancelled) return;
      setDims({ w: img.naturalWidth, h: img.naturalHeight });
      setLoaded(true);
    };
    img.onerror = () => {
      if (cancelled) return;
      setLoaded(false);
      setDims(null);
    };
    img.src = src;
    if (img.complete) {
      if (img.naturalWidth) {
        setDims({ w: img.naturalWidth, h: img.naturalHeight });
        setLoaded(true);
      } else {
        setLoaded(false);
        setDims(null);
      }
    }
    return () => {
      cancelled = true;
    };
  }, [src]);

  // Preload the wallpaper so a missing/404 file falls back to the gradient
  // instead of rendering a broken background.
  useEffect(() => {
    if (!bg) {
      setBgReady(false);
      return;
    }
    let cancelled = false;
    const img = new window.Image();
    img.onload = () => !cancelled && setBgReady(true);
    img.onerror = () => !cancelled && setBgReady(false);
    img.src = bg;
    return () => {
      cancelled = true;
    };
  }, [bg]);

  // Measure after mount (refs are set before effects run, so the panel exists
  // here even though it renders in the same commit as `loaded` flips true).
  useEffect(() => {
    if (!loaded || !dims) return;
    const compute = () => {
      const vp = viewportRef.current;
      if (!vp) return;
      const ratio = dims.h / dims.w;
      const displayedHeight = vp.clientWidth * ratio; // height at bg-size "100% auto"
      const overflow = displayedHeight - vp.clientHeight;
      // Only pages meaningfully taller than the frame pan; the rest go "cover".
      setScrollPx(overflow > vp.clientHeight * MIN_SCROLL_OVERFLOW ? overflow : 0);
    };
    compute();
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("resize", compute);
    };
  }, [loaded, dims, src]);

  const scrolls = scrollPx > 0;
  const animate = !reduceMotion && scrolls;

  const pan = scrollPx / PAN_SPEED;

  if (!loaded) return null;

  return (
    <div className="relative" style={{ aspectRatio: "16/10" }}>
      <div
        className="pointer-events-none absolute inset-0"
        role="img"
        aria-label={alt}
      >
        {/* wallpaper background (falls back to a gradient when `bg` is absent) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: isLight ? FALLBACK_BASE_LIGHT : FALLBACK_BASE_DARK,
            backgroundImage:
              bgReady && bg
                ? `url("${bg}")`
                : isLight
                  ? FALLBACK_BG_LIGHT
                  : FALLBACK_BG_DARK,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* floating screenshot panel */}
        <div
          ref={viewportRef}
          className="sp-shot"
          style={{
            position: "absolute",
            left: 22,
            right: 22,
            top: 20,
            bottom: 0,
            overflow: "hidden",
            borderRadius: 10,
            boxShadow:
              "0 24px 50px -12px rgba(8,20,55,0.55), 0 8px 18px -8px rgba(8,20,55,0.45)",
            border: "1px solid rgba(255,255,255,0.18)",
          }}
        >
          <motion.div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url("${src}")`,
              // Tall pages fill width and pan; normal images cover the frame.
              backgroundSize: scrolls ? "100% auto" : "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: scrolls ? "50% 0%" : "center",
            }}
            animate={
              animate
                ? {
                    backgroundPosition: isHovered ? "50% 100%" : "50% 0%",
                  }
                : { backgroundPosition: scrolls ? "50% 0%" : "center" }
            }
            transition={
              animate
                ? {
                    duration: isHovered
                      ? pan
                      : Math.min(Math.max(pan * 0.35, 0.4), 0.75),
                    ease: isHovered ? "linear" : [0.25, 1, 0.5, 1],
                  }
                : { duration: 0 }
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ScrollingPreview;
