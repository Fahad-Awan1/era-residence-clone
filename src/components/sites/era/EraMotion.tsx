"use client";

import { useEffect } from "react";

/** Starts the page's GSAP/Lenis behaviour once fonts are ready; text splitting measures glyphs. */
export function EraMotion() {
  useEffect(() => {
    let cancelled = false;
    Promise.all([import("./motion"), document.fonts.ready]).then(([{ initEra }]) => {
      if (!cancelled) initEra();
    });
    return () => {
      cancelled = true;
    };
  }, []);
  return null;
}
